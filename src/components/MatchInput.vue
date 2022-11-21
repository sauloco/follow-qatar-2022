<script setup>
import { ref, computed } from "vue";
import { getFromLS, setToLS } from "../utils/localStorage";

const props = defineProps({
  homeName: {
    type: String,
    required: true,
  },
  awayName: {
    type: String,
    required: true,
  },
  homeFlag: {
    type: String,
    default: "🏳️",
  },
  awayFlag: {
    type: String,
    default: "🏳️",
  },
  date: {
    type: String,
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
  knockout: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
const min = 0;
const max = 12;
const maxPen = 99;

const oldData = getFromLS(props.matchId);

let homeRef = 0;
let awayRef = 0;
let homePenRef = 0;
let awayPenRef = 0;

if (oldData) {
  const [oldHomeScore, oldAwayScore, oldHomePen, oldAwayPen] = oldData;
  homeRef = parseInt(oldHomeScore) || 0;
  awayRef = parseInt(oldAwayScore) || 0;
  homePenRef = parseInt(oldHomePen) || 0;
  awayPenRef = parseInt(oldAwayPen) || 0;
}

const homeScore = ref(homeRef);
const awayScore = ref(awayRef);
const homeScorePen = ref(homePenRef);
const awayScorePen = ref(awayPenRef);

const emit = defineEmits(["score"]);

function sendScore() {
  homeScore.value = Math.max(homeScore.value, min);
  awayScore.value = Math.max(awayScore.value, min);
  homeScore.value = Math.min(homeScore.value, max);
  awayScore.value = Math.min(awayScore.value, max);

  const options = {
    matchId: props.matchId,
    homeScore,
    awayScore,
    winner,
    loser,
  };
  if (props.knockout) {
    options.homeScorePen = homeScorePen;
    options.awayScorePen = awayScorePen;
  }
  setToLS(props.matchId, [
    homeScore.value,
    awayScore.value,
    homeScorePen.value,
    awayScorePen.value,
  ]);
  emit("score", options);
}

const winner = computed(() =>
  homeScore.value > awayScore.value || homeScorePen.value > awayScorePen.value
    ? [props.homeName, props.homeFlag]
    : [props.awayName, props.awayFlag]
);
const loser = computed(() =>
  winner.value[0] === props.homeName
    ? [props.awayName, props.awayFlag]
    : [props.homeName, props.homeFlag]
);

const penaltyRoundComment = computed(() => {
  if (
    props.knockout &&
    homeScore.value === awayScore.value &&
    homeScorePen.value === awayScorePen.value
  ) {
    return "No puede haber empate en los penales ❌";
  }

  if (props.knockout && Math.abs(homeScore.value - awayScore.value) > 3) {
    return "No puede haber mas de 3 goles de diferencia en los penales ❌";
  }
  return null;
});

if (oldData) {
  const options = {
    matchId: props.matchId,
    homeScore,
    awayScore,
    winner,
    loser,
  };
  if (props.knockout) {
    options.homeScorePen = homeScorePen;
    options.awayScorePen = awayScorePen;
  }
  emit("score", options);
}
</script>
<template>
  <div class="match-input">
    <time class="date">{{ date }}</time>
    <div class="row">
      <span class="flag">{{ props.homeFlag }}</span>
      <span class="home name">{{ props.homeName }}</span>
      <span class="home score">
        <strong v-if="readonly">{{ homeScore }}</strong>
        <input
          v-else
          type="number"
          :min="0"
          :max="15"
          v-model="homeScore"
          @change="sendScore"
        />
      </span>

      <span class="divider"> – </span>

      <span class="score">
        <strong v-if="readonly">{{ awayScore }}</strong>
        <input
          v-else
          type="number"
          :min="min"
          :max="max"
          v-model="awayScore"
          @change="sendScore"
        />
      </span>
      <span class="name">{{ props.awayName }}</span>
      <span class="away flag">{{ props.awayFlag }}</span>
    </div>
    <div v-if="knockout && homeScore === awayScore" class="row">
      <span class="home balls">
        <span v-for="n in homeScorePen" :key="n">⚽️</span>
      </span>
      <span class="home score">
        <span v-if="readonly">
          <strong>{{ homeScorePen }}</strong>
        </span>
        <input
          v-else
          type="number"
          :min="min"
          :max="maxPen"
          v-model="homeScorePen"
          @change="sendScore"
        />
      </span>
      <span class="divider"> – </span>
      <span class="score">
        <strong v-if="readonly">{{ awayScorePen }}</strong>
        <input
          v-else
          type="number"
          :min="min"
          :max="maxPen"
          v-model="awayScorePen"
          @change="sendScore"
        />
      </span>
      <span class="away balls">
        <span v-for="n in awayScorePen" :key="n">⚽️</span>
      </span>
    </div>
    <div v-if="penaltyRoundComment" class="warning">
      {{ penaltyRoundComment }}
    </div>
  </div>
</template>
<style scoped>
.match-input {
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.match-input:first-child {
  border-top: none;
}
.name {
  font-size: 1.2rem;
  margin: 0 0.5rem;
  width: 25%;
}
.home.name {
  text-align: right;
}
.flag {
  font-size: 1.5rem;
  margin: 0 0.5rem;
  line-height: 2rem;
  width: 10%;
}
.flag.away {
  text-align: right;
}
.divider {
  width: 5%;
  text-align: center;
}
.score {
  width: 10%;
}
.home.score {
  text-align: right;
}
input {
  text-align: center;
  text-decoration: none;
  border: 1px solid #550065;
  border-radius: 5px;
  width: 100%;
  font-size: 1.3rem;
  padding: 5px 0;
}
.row {
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
}
.row div {
  display: inline-flex;
}
.date {
  color: #806186;
  font-weight: bold;
}

.warning {
  font-size: 1rem;
  color: #806186;
}

.balls {
  width: 45%;
  font-size: 1.2rem;
  line-height: 2.5rem;
  margin: 0 1rem;
}
.home.balls {
  text-align: right;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>