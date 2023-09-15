import groups from "../assets/data.json";

export function getFromSource(matchId) {
  if (!matchId) {
    return [];
  }
  let [type, name, id] = matchId.split("-");
  if (!id) {
    id = name;
  }
  if (type === "today" || type === 'tomorrow') {
    return []
  } else if (type === "group") {
    const group = groups.find((group) => group.name === name);
    return group.matches[id];
  } else if (type === "round") {
    if (name === "16") {
      return roundOf16Template[id];
    }
    return roundOf8[id];
  } else if (type === "semifinals") {
    return semifinals[id];
  }
  return finals[id];
}

export const roundOf16 = {
  a: null,
  aa: null,
  b: null,
  bb: null,
  c: null,
  cc: null,
  d: null,
  dd: null,
  e: null,
  ee: null,
  f: null,
  ff: null,
  g: null,
  gg: null,
  h: null,
  hh: null,
};

export const roundOf16Template = [
  ["a", "bb", "3/12 12:00"],
  ["c", "dd", "3/12 16:00"],
  ["d", "cc", "4/12 12:00"],
  ["b", "aa", "4/12 16:00"],
  ["e", "ff", "5/12 12:00"],
  ["g", "hh", "5/12 16:00"],
  ["f", "ee", "6/12 12:00"],
  ["h", "gg", "6/12 16:00"],
];

export const roundOf8 = [
  [null, null, "9/12 12:00"],
  [null, null, "9/12 16:00"],
  [null, null, "10/12 12:00"],
  [null, null, "10/12 16:00"],
];

export const semifinals = [
  [null, null, "13/12 12:00"],
  [null, null, "13/12 12:00"],
];

export const finals = [
  [null, null, "17/12 18:00"],
  [null, null, "18/12 18:00"],
];
