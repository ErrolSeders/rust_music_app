/* eslint-disable react-hooks/exhaustive-deps */
import { useNoteNames } from "@/contexts/NoteNameContext";
import { useEffect, useRef, useState } from "react";

const ChordScrollContainer = ({children}: {children: React.ReactNode}) => {
      return (
        <div
          style={{
            position: "relative", 
            height: "100%", 
            overflow: "scroll",
           }}
        >
          <div
            style={{
              position: "relative"
            }}
          >
            {children}
          </div>
        </div>
      );
}

interface ChordButtonsProps {
    wasmPromise: Promise<WasmModule>;  
    currentScale: Scale;
    selectedChord: Chord;
    setSelectedChord: ReactSetter<Chord>;
}

const ChordButtons = ({wasmPromise, currentScale, selectedChord, setSelectedChord}: ChordButtonsProps) => {
    const { noteNames } = useNoteNames();

    const qualities = {
        triads: [
            "maj","min","dim","aug","sus2","sus4",
        ],
         tetrads: [
            "maj7","m7","7",
            "dim7","m7b5","mMaj7","maj6","min6"
        ],
        pentads: [
            "6/9","9","maj9","min9"
        ],
        hexads: [
            "11","maj11","min11"
        ]
    }
    
    const decode = (chordNum: number, quality: string) => {
        const chordStr = chordNum.toString(16).substring(1);
        let notes= [];

        for (let i = 0; i < chordStr.length; i++) {
            let note = parseInt(chordStr[i], 16);
            notes.push(note);
        }

        notes = notes.reverse();

        return {
            tonic: { num: notes[0], letter: noteNames[notes[0]] },
            quality: quality,
            notes: new Uint16Array(notes)
        }
    }

    const [chords, setChords] = useState<ChordGroup>(
        {triads: [], tetrads:[], pentads: [], hexads: []}
    );

    useEffect(() => {  
        setChords({triads: [], tetrads:[], pentads: [], hexads: []});
        wasmPromise.then((wasm: WasmModule) => {
            let newChords: ChordGroup = {triads: [], tetrads:[], pentads: [], hexads: []};
            Object.entries(qualities).map(([key, quals]) => {
                for (let qual of quals) {
                    const in_scale: Uint32Array = wasm.get_chord_in_scale(qual, currentScale.tonic.num, currentScale.pitchclassset)   
                    for (let i = 0; i < in_scale.length; i++) {
                        let chordNum = in_scale[i];
                        let chord = decode(chordNum, qual);
                        newChords[key].push(chord);
                    }
                } 
            })      
            setChords(newChords);
        })
    }, [currentScale, noteNames]);

    const captialize = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        //! : Fix the height of the container for smaller screens
        <div className="flex flex-col h-[60%] lg:h-screen lg:w-80 mx-auto">
        {Object.entries(chords).map(([group, chords], i) => (
            <div key={i} className="grid-cols-2 max-h-[20vh] my-1 py-2 px-2 ml-2 mr-auto">
                <div>{captialize(group) + ":"}</div>
                <hr className="w-full bg-neutral-900"/>
                <ChordScrollContainer>
                <div className="grid-cols-3 justify-center items-center justify-items-stretch mx-auto">
                {chords.map((chord, j) => (
                    <button 
                        key={j} 
                        onClick={() => {setSelectedChord(chord)}} 
                        className={
                            `${chord === selectedChord ? 'bg-neutral-600' : 'bg-neutral-400'} 
                            px-2 my-1 mx-1 rounded-md`
                        }
                    >
                        {chord.tonic.letter + ' ' + chord.quality}
                    </button>
                
                ))} 
                </div>
                </ChordScrollContainer>
            </div>
        ))}
    </div>
    )
}


export default ChordButtons;