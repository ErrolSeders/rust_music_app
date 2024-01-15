'use client'
import { useEffect, useState } from "react";

interface ChordButtonsProps {
    wasmModule: any;  
    currentScale: Scale;
    NOTES: { [key: number]: string };
    setSelectedChord: React.Dispatch<React.SetStateAction<Chord>>;
}


const ChordButtons = ({wasmModule, currentScale, NOTES, setSelectedChord}: ChordButtonsProps) => {
    
    const qualities = {
        triads: [
            "maj","min","dim","aug"
        ],
         tetrads: [
            "sus2","sus4","maj7","m7","7",
            "dim7","m7b5","mMaj7","maj6","min6"
        ],
        pentads: [
            "6/9","9","maj9","min9"
        ],
        hexads: [
            "11","maj11","min11"
        ]
    }
    
    const decode = (chordNum, quality) => {
        const chordStr = chordNum.toString(16).substring(1);
        let notes= [];

        for (let i = 0; i < chordStr.length; i++) {
            let note = parseInt(chordStr[i], 16);
            notes.push(note);
        }

        notes = notes.reverse();

        return {
            tonic: { num: notes[0], letter: NOTES[notes[0]] },
            quality: quality,
            notes: new Uint16Array(notes)
        }
    }

    const [chords, setChords] = useState<ChordGroup>(
        {triads: [], tetrads:[], pentads: [], hexads: []}
    );

    useEffect(() => {  
        setChords({triads: [], tetrads:[], pentads: [], hexads: []});
        wasmModule.then((wasm) => {
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
    }, [currentScale, NOTES]);

    

    return (
        <div className="flex flex-col w-80 mx-auto">
        {Object.entries(chords).map(([group, chords], i) => (
            <div key={i} className="flex flex-row flex-wrap justify-center py-2 mx-auto">
                {chords.map((chord, j) => (
                    <button key={j} onClick={() => {setSelectedChord(chord)}} className="bg-blue-500 px-2 mx-1 rounded-md">
                        {chord.tonic.letter + ' ' + chord.quality}
                    </button>
                ))}
            </div>
        ))}
    </div>
    )
}


export default ChordButtons;