<template>
  <h1>Octavos de Final</h1>
  <div class="match-wrapper">
    <MatchInput
      v-for="([homeName, homeFlag, awayName, awayFlag, date], index) in matches"
      knockout
      :key="`${homeName}-${awayName}`"
      :matchId="`round-16-${index}`"
      :homeName="homeName"
      :homeFlag="homeFlag"
      :awayName="awayName"
      :awayFlag="awayFlag"
      :date="date"
      @score="updateMatch"
    />
  </div>
  <NavigationActions
    :back="['/grupo/H', 'Grupo H']"
    :forward="
      completed
        ? ['/cuartos', 'Cuartos']
        : ['#', 'Complete Octavos antes de continuar']
    "
  ></NavigationActions>
</template>
<script>
import MatchInput from "../components/MatchInput.vue";
import NavigationActions from "../components/NavigationActions.vue";
import { roundOf16Template, roundOf16, roundOf8 } from "../store/simpleStore";

export default {
  name: "RoundOf16",
  components: {
    MatchInput,
    NavigationActions,
  },
  data() {
    return {
      template: roundOf16Template,
      matches: roundOf16Template.map(([keyHome, keyAway, date]) => [
        ...(roundOf16[keyHome] || ["S/D", "🏳️"]),
        ...(roundOf16[keyAway] || ["S/D", "🏳️"]),
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
    updateMatch({ index, winner }) {
      const idx = index.split("-").reverse()[0];
      switch (idx) {
        case 0:
          roundOf8[0][0] = winner;
          break;

        case 1:
          roundOf8[0][1] = winner;
          break;

        case 2:
          roundOf8[1][0] = winner;
          break;
        case 3:
          roundOf8[1][1] = winner;
          break;

        case 4:
          roundOf8[2][0] = winner;
          break;
        case 5:
          roundOf8[2][1] = winner;
          break;
        case 6:
          roundOf8[3][0] = winner;
          break;
        case 7:
          roundOf8[3][1] = winner;
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
