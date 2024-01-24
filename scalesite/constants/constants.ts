export const NOTENUMBERSFLATS: { [key: number]: string } = {
  0: "C",
  1: "Db",
  2: "D",
  3: "Eb",
  4: "E",
  5: "F",
  6: "Gb",
  7: "G",
  8: "Ab",
  9: "A",
  10: "Bb",
  11: "B",
};

export const NOTENUMBERSSHARPS: { [key: number]: string } = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

// prettier-ignore
export const NOTENAMESTONUMBERS: { [key: string]: number } = {
  "C": 0,
  "C#": 1,
  "Db": 1,
  "D": 2,
  "D#": 3,
  "Eb": 3,
  "E": 4,
  "F": 5,
  "F#": 6,
  "Gb": 6,
  "G": 7,
  "G#": 8,
  "Ab": 8,
  "A": 9,
  "A#": 10,
  "Bb": 10,
  "B": 11,
};

export const ANGLESTOTONICS: { [angle: number]: number } = {
  270: 0,
  240: 1,
  210: 2,
  180: 3,
  150: 4,
  120: 5,
  90: 6,
  60: 7,
  30: 8,
  360: 9,
  330: 10,
  300: 11,
};

const COLORSHEMELIST = {
  d_primary: "#282c34",
  d_secondary: "#3a3f4b",
  d_accent: "#4f566b",
  l_primary: "#e9eae6",
  l_secondary: "#93aac3",
  l_accent: "#9fA2A6",
  inscale: "#89c6f1",
  inchord: "#1e88e4",
  tonic: "#2c488f",
  dark: "#181f3f",
};
