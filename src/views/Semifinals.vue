<template>
  <h1>Semifinales</h1>
  <div class="match-wrapper">
    <MatchInput
      v-for="([homeName, homeFlag, awayName, awayFlag, date], index) in matches"
      knockout
      :key="`${homeName}-${awayName}`"
      :matchId="`semifinals-${index}`"
      :homeName="homeName"
      :homeFlag="homeFlag"
      :awayName="awayName"
      :awayFlag="awayFlag"
      :date="date"
      @score="updateMatch"
    />
  </div>
  <NavigationActions
    :back="['/cuartos', 'Cuartos']"
    :forward="
      completed
        ? ['/finales', 'Finales']
        : ['#', 'Complete Semifinales antes de continuar']
    "
  ></NavigationActions>
</template>
<script>
import MatchInput from "../components/MatchInput.vue";
import { semifinals, finals } from "../store/simpleStore";
import NavigationActions from "@/components/NavigationActions.vue";

export default {
  name: "Semifinals",
  components: {
    MatchInput,
    NavigationActions,
  },
  data() {
    return {
      matches: semifinals.map(([home, away, date]) => [
        ...(home || ["S/D", "🏳️"]),
        ...(away || ["S/D", "🏳️"]),
        date,
      ]),
    };
  },
  computed: {
    completed() {
      for (const [home, away] of this.matches) {
        if (home[0] === "S/D" || away[0] === "S/D") {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    updateMatch({ index, winner, loser }) {
      if (!winner) {
        return;
      }
      console.log(index)
      const idx = index.split("-").reverse()[0];
      switch (idx) {
        case 0:
          finals[0][0] = loser;
          break;

        case 1:
          finals[0][1] = loser;
          break;

        case 2:
          finals[1][0] = winner;
          break;
        case 3:
          finals[1][1] = winner;
          break;
        default:
          console.error("The What?");
      }
    },
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
.match-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
