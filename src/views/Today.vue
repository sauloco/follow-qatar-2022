<template>
  <h1 v-if="todayMatches.length">Partidos de Hoy</h1>
  <div v-if="todayMatches.length" class="match-wrapper">
    <MatchInput
      v-for="([home, away, date], index) in todayMatches"
      readonly
      :key="`${home}-${away}`"
      :matchId="`today-${index}`"
      :homeName="teams[home][0]"
      :homeFlag="teams[home][1]"
      :awayName="teams[away][0]"
      :awayFlag="teams[away][1]"
      :date="date"
    />
  </div>
  <h1 v-else>Hoy no hay partidos</h1>

  <h2 v-if="tomorrowMatches.length">Partidos de Mañana</h2>
  <div v-if="tomorrowMatches.length" class="match-wrapper">
    <MatchInput
      v-for="(
        [
          home,
          away,
          date,
          actualHomeScore,
          actualAwayScore,
          actualHomePen,
          actualAwayPen,
        ],
        index
      ) in tomorrowMatches"
      readonly
      :key="`${home}-${away}`"
      :matchId="`tomorrow-${index}`"
      :homeName="teams[home][0]"
      :homeFlag="teams[home][1]"
      :awayName="teams[away][0]"
      :awayFlag="teams[away][1]"
      :actualHomeScore="actualHomeScore"
      :actualAwayScore="actualAwayScore"
      :actualHomePen="actualHomePen"
      :actualAwayPen="actualAwayPen"
      :date="date"
    />
  </div>
  <h2 v-else>Mañana no habrá partidos</h2>
</template>
<script>
import MatchInput from "@/components/MatchInput.vue";
import groups from "../assets/data.json";
import { roundOf16, roundOf8, semifinals, finals } from "@/store/simpleStore";

export default {
  name: "Today",
  components: {
    MatchInput,
  },
  data() {
    return {
      groups,
    };
  },
  computed: {
    todayMatches() {
      const toDay = new Date().getDate();
      const toMonth = new Date().getMonth();
      return this.getMatchesPerDate(toDay, toMonth);
    },
    tomorrowMatches() {
      let toMorrow = new Date().getDate();
      let toMorrowMonth = new Date().getMonth();
      if (toMorrow === 30) {
        toMorrow = 1;
        toMorrowMonth++;
      } else {
        toMorrow++;
      }
      return this.getMatchesPerDate(toMorrow, toMorrowMonth);
    },
    teams() {
      let teams = {};
      for (const { teams: groupTeams } of groups) {
        teams = { ...teams, ...groupTeams };
      }
      return teams;
    },
  },
  methods: {
    getMatchesPerDate(day, month) {
      const matches = [];
      for (const group of groups) {
        matches.push(
          ...group.matches
            .filter((match) => match[2].includes(`${day}/${month + 1}`))
            .sort((a, b) => {
              const result = a[2].localeCompare(b[2]);
              console.log(a, b, result);
              return result;
            })
            .filter(Boolean)
        );
      }
      return matches;
    },
  },
};
</script>