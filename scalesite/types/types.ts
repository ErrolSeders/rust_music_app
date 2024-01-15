type Note = {
  num: number;
  letter: string;
};

type Chord = {
  tonic: Note;
  quality: string;
  notes: Uint16Array;
};

type Scale = {
  scalenum: number;
  tonic: Note;
  pitchclassset: Uint16Array;
  intervals: Uint16Array;
};

type ChordGroup = {
  [key: string]: Chord[];
  triads: Chord[];
  tetrads: Chord[];
  pentads: Chord[];
  hexads: Chord[];
};
