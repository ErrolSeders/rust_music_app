/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";

interface ChordButtonsProps {
    wasmPromise: Promise<WasmModule>;  
    currentScale: Scale;
    NOTES: { [key: number]: string };
    selectedChord: Chord;
    setSelectedChord: React.Dispatch<React.SetStateAction<Chord>>;
}


const ChordButtons = ({wasmPromise, currentScale, NOTES, selectedChord, setSelectedChord}: ChordButtonsProps) => {
    
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
    }, [currentScale, NOTES]);

    

    return (
        <div className="flex flex-col w-80 mx-auto">
        {Object.entries(chords).map(([group, chords], i) => (
            <div key={i} className="grid-cols-2 py-2 px-2 ml-2 mr-auto">
                <div>{group + ":"}</div>
                <div className="grid-cols-3 justify-center items-center justify-items-stretch mx-auto">
                {chords.map((chord, j) => (
                    <button 
                        key={j} 
                        onClick={() => {setSelectedChord(chord)}} 
                        className={
                            `${chord === selectedChord ? 'bg-ps1blue-700' : 'bg-ps1blue-200'} 
                            px-2 items-center justify-center my-1 mx-1 rounded-md`
                        }
                    >
                        {chord.tonic.letter + ' ' + chord.quality}
                    </button>
                
                ))}</div>
            </div>
        ))}
    </div>
    )
}


export default ChordButtons;