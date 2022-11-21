<template>
  <h1>Final & 3er y 4to Puesto</h1>
  <div class="match-wrapper">
    <MatchInput
      v-for="([homeName, homeFlag, awayName, awayFlag, date], index) in matches"
      knockout
      :key="`${homeName}-${awayName}`"
      :matchId="`finals-${index}`"
      :homeName="homeName"
      :homeFlag="homeFlag"
      :awayName="awayName"
      :awayFlag="awayFlag"
      :date="date"
      @score="updateMatch"
    />
  </div>
  
  <h2 v-if="champion">
    🏆<br />
    Campeón <br />
    {{ champion[1] }} <br />
    {{ champion[0] }}
  </h2>
  <NavigationActions
    :back="['/semifinales', 'Semifinales']"
    :forward="null"
  ></NavigationActions>
  <div v-if="champion" class="share">
    <span>Comparte tu prediccion con tus amigos</span>
    <div class="button share copylink">
      <font-awesome-icon icon="fa-solid fa-copy" />
    </div>
    <div class="button share whatsapp">
      <font-awesome-icon icon="fa-brands fa-whatsapp" />
    </div>
    <div class="button share telegram">
      <font-awesome-icon icon="fa-brands fa-telegram" />
    </div>
    <div class="button share twitter">
      <font-awesome-icon icon="fa-brands fa-twitter" />
    </div>
    <div class="button share facebook">
      <font-awesome-icon icon="fa-brands fa-facebook" />
    </div>
  </div>
</template>
<script>
import MatchInput from "../components/MatchInput.vue";
import NavigationActions from "@/components/NavigationActions.vue";
import { finals } from "../store/simpleStore";


export default {
  name: "Finals",
  components: {
    MatchInput,
    NavigationActions
  },
  data() {
    return {
      matches: finals.map(([home, away, date]) => [
        ...(home || ["S/D", "🏳️"]),
        ...(away || ["S/D", "🏳️"]),
        date,
      ]),
      champion: null,
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
    updateMatch({ matchId, winner }) {
      if (matchId === "finals-1") {
        if (!winner) {
          this.champion = null;
        }
        this.champion = winner;
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

h2 {
  text-align: center;
  text-transform: uppercase;
  margin: 5rem;
  padding: 10rem 0;
  color: white;
  border-radius: 15px;
  background: linear-gradient(180deg, #cbbfcd 0%, #550065 100%);
}
</style>
