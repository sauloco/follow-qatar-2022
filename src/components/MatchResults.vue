<template>
  <h2>Totales</h2>
  <div class="table">
    <div class=""></div>
    <div class="header text">Pais</div>
    <div class="header">G</div>
    <div class="header">E</div>
    <div class="header">P</div>
    <div class="header">GF</div>
    <div class="header">GC</div>
    <div class="header">Dif</div>
    <div class="header">Pts</div>
    <div class="header"></div>

    <template
      v-for="(
        { name, flag, won, tie, lose, gf, gc, dif, pts }, index
      ) in finalResults"
      :key="`${name}${index}`"
    >
      <div class="flag">{{ flag }}</div>
      <div class="text">{{ name }}</div>
      <div>{{ won }}</div>
      <div>{{ tie }}</div>
      <div>{{ lose }}</div>
      <div>{{ gf }}</div>
      <div>{{ Math.abs(gc) }}</div>
      <div>{{ dif }}</div>
      <div>
        <strong>{{ pts }}</strong>
      </div>
      <div class="text">
        {{ index < 2 ? "✅" : "" }}
      </div>
    </template>
  </div>
</template>
<script>
import { roundOf16 } from "@/store/simpleStore";

export default {
  name: "MatchResults",
  props: {
    groupName: {
      type: String,
      required: true,
    },
    teams: {
      type: Object,
      required: true,
    },
    results: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    finalResults() {
      let finalResults = {};
      for (const [home, away, date, homeScore = 0, awayScore = 0] of this
        .results) {
        let homePoints = homeScore > awayScore ? 3 : 0;
        let awayPoints = homeScore > awayScore ? 0 : 3;
        if (homeScore === awayScore) {
          homePoints = 1;
          awayPoints = 1;
        }
        const homeGf = (finalResults?.[home]?.gf || 0) + homeScore;
        const homeGc = (finalResults?.[home]?.gc || 0) - awayScore;
        const homeDif = homeGf - homeGc;
        const homePts = (finalResults?.[home]?.pts || 0) + homePoints;

        const awayGf = (finalResults?.[away]?.gf || 0) + awayScore;
        const awayGc = (finalResults?.[away]?.gc || 0) - homeScore;
        const awayDif = awayGf - awayGc;
        const awayPts = (finalResults?.[away]?.pts || 0) + awayPoints;

        const [homeName, homeFlag] = this.teams[home];
        const [awayName, awayFlag] = this.teams[away];

        const homeWon =
          (finalResults?.[home]?.won || 0) + (homePoints === 3 ? 1 : 0);
        const homeTie =
          (finalResults?.[home]?.tie || 0) + homePoints === 1 ? 1 : 0;
        const homeLose =
          (finalResults?.[home]?.lose || 0) + homePoints === 0 ? 1 : 0;

        const awayWon =
          (finalResults?.[away]?.won || 0) + (awayPoints === 3 ? 1 : 0);
        const awayTie =
          (finalResults?.[away]?.tie || 0) + awayPoints === 1 ? 1 : 0;
        const awayLose =
          (finalResults?.[away]?.lose || 0) + awayPoints === 0 ? 1 : 0;

        finalResults = {
          ...finalResults,
          [home]: {
            name: homeName,
            flag: homeFlag,
            won: homeWon,
            tie: homeTie,
            lose: homeLose,
            gf: homeGf,
            gc: homeGc,
            dif: homeDif,
            pts: homePts,
          },
          [away]: {
            name: awayName,
            flag: awayFlag,
            won: awayWon,
            tie: awayTie,
            lose: awayLose,
            gf: awayGf,
            gc: awayGc,
            dif: awayDif,
            pts: awayPts,
          },
        };
      }
      const results = Object.values(finalResults)
        .sort((a, b) => b.gf - a.gf)
        .sort((a, b) => b.dif - a.dif)
        .sort((a, b) => b.pts - a.pts);

      if (results.length >= 2) {
        roundOf16[this.groupName.toLocaleLowerCase()] = [
          results[0].name,
          results[0].flag,
        ];
        roundOf16[(this.groupName + this.groupName).toLocaleLowerCase()] = [
          results[1].name,
          results[1].flag,
        ];
      }

      return results;
    },
  },
};
</script>
<style scoped>
strong,
.header {
  font-weight: bold;
  justify-self: right;
}
.table {
  display: grid;
  grid: auto-flow / 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: right;
  font-size: 1.2rem;
  gap: 10px;
}
.table .text {
  justify-self: left;
}

.flag {
  font-size: 1.5rem;
  margin: 0 0.5rem;
  line-height: 2rem;
}
</style>
