<template>
  <h1>Cuartos de Final</h1>
  <div class="match-wrapper">
    <MatchInput
      v-for="([homeName, homeFlag, awayName, awayFlag, date], index) in matches"
      knockout
      :key="`${homeName}-${awayName}`"
      :matchId="`round-8-${index}`"
      :homeName="homeName"
      :homeFlag="homeFlag"
      :awayName="awayName"
      :awayFlag="awayFlag"
      :date="date"
      @score="updateMatch"
    />
  </div>
  <NavigationActions
    :back="['/octavos', 'Octavos']"
    :forward="
      completed
        ? ['/semifinales', 'Semifinales']
        : ['#', 'Complete Cuartos antes de continuar']
    "
  ></NavigationActions>
</template>
<script lang="ts">
import MatchInput from "../components/MatchInput.vue";
import { roundOf8, semifinals } from "../store/simpleStore";
import NavigationActions from "@/components/NavigationActions.vue";

export default {
  name: "RoundOf8",
  components: {
    MatchInput,
    NavigationActions
  },
  data() {
    return {
      matches: roundOf8.map(([home, away, date]) => [
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
    updateMatch({ index, winner }) {
      if (!winner) {
        return;
      }
      const idx = index.split('-').reverse()[0]
      switch (idx) {
        case 0:
          semifinals[0][0] = winner;
          break;

        case 1:
          semifinals[0][1] = winner;
          break;

        case 2:
          semifinals[1][0] = winner;
          break;
        case 3:
          semifinals[1][1] = winner;
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
