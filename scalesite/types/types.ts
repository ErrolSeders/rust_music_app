type ScaleUIState = {
  notesOn: { [key: number]: boolean };
  tonic: number;
};

type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type NoteNames = { [key: number]: string };

type WasmModule = {
  default: typeof import("@/pkg/scalesite_api");
  fibonnaci: (n: number) => number;
  get_scalenum: (notes_on: Uint8Array) => number;
  get_scalename: (scalenum: number) => string;
  build_pitchclassset: (scalenum: number) => Uint16Array;
  build_intervals: (pitchclassset: Uint16Array) => Uint16Array;
  get_chord_in_scale: (
    quality: string,
    tonic: number,
    pitchclassset: Uint16Array
  ) => Uint32Array;
};

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
