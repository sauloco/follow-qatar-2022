<template>
  <h1>Grupo {{ name }}</h1>
  <div class="group-match-wrapper">
    <MatchInput
      v-for="([home, away, date], index) in matches"
      :key="`${home}-${away}`"
      :matchId="`group-${name}-${index}`"
      :homeName="getTeamData(home).team"
      :homeFlag="getTeamData(home).flag"
      :awayName="getTeamData(away).team"
      :awayFlag="getTeamData(away).flag"
      :date="date"
      @score="updateMatch"
    />
    <MatchResults :groupName="name" :teams="teams" :results="matches" />
    <NavigationActions :back="back" :forward="forward"></NavigationActions>
  </div>
</template>
<script>
import groups from "../assets/data.json";
import MatchInput from "../components/MatchInput.vue";
import MatchResults from "../components/MatchResults.vue";
import NavigationActions from "@/components/NavigationActions.vue";

export default {
  name: "GroupData",
  components: {
    MatchInput,
    MatchResults,
    NavigationActions,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      matches: [],
    };
  },
  mounted() {
    this.matches = this.group?.matches;
  },
  watch: {
    name() {
      this.matches = this.group?.matches;
    },
  },
  computed: {
    group() {
      return groups.find((value) => value.name === this.name);
    },
    teams() {
      return this.group?.teams;
    },
    back() {
      if (this.name === "A") {
        return null;
      }
      const order = "ABCDEFGH".split("");
      const prevName = order[order.indexOf(this.name) - 1];

      const target = `/grupo/${prevName}`;
      const text = `Grupo ${prevName}`;

      return [target, text];
    },
    forward() {
      if (this.name === "H") {
        return ["/octavos", "Octavos >"];
      }

      const order = "ABCDEFGH".split("");
      const nextName = order[order.indexOf(this.name) + 1];

      const target = `/grupo/${nextName}`;
      const text = `Grupo ${nextName}`;

      return [target, text];
    },
  },
  methods: {
    getTeamData(countryName) {
      try {
        const [team, flag] = this.teams[countryName];
        return {
          team,
          flag,
        };
      } catch (e) {
        console.error(`asking for ${countryName}`);
        console.error(e);
      }
      return {};
    },
    updateMatch({ matchId, homeScore, awayScore }) {
      const [prefix, name, index] = matchId.split("-");
      const currentMatch = this.matches[parseInt(index)];
      if (currentMatch.length === 5) {
        currentMatch.pop();
        currentMatch.pop();
      }
      currentMatch.push(homeScore.value, awayScore.value);
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.group-match-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
