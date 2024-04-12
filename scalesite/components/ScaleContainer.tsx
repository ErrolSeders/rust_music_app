/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import AccidentalButton from "./AccidentalButton";
import ChordButtons from "./ChordButtons";
import GuitarNeck  from "./GuitarNeck";
import ScaleRing from "./ScaleRing";
import ScaleTitle from "./ScaleTitle";

import {useEffect, useState} from 'react';
import { useWasm } from "@/contexts/WasmContext";
import { useNoteNames } from "@/contexts/NoteNameContext";
import { bitrotateleft, rotate } from "@/utils/utils";
import { NOTENAMESTONUMBERS, NOTENUMBERSFLATS } from "@/constants/constants";

const ScaleUIState: ScaleUIState = {
    notesOn: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
    }, 

    tonic: 0
}

const ScaleContainer = () => {

    const wasmPromise = useWasm();
    const {noteNames, setNoteNames} = useNoteNames();
    const [scaleUIState, setScaleUIState] = useState<ScaleUIState>(ScaleUIState);
    const [currentScale, setCurrentScale] = useState<Scale>({
        scalenum: 0,
        tonic: {num: 0, letter: "C"},
        pitchclassset: new Uint16Array(0),
        intervals: new Uint16Array(0),
    });

    const [selectedChord, setSelectedChord] = useState<Chord>({
        tonic: {num: -1, letter: ""},
        quality: "",
        notes: new Uint16Array(0),
    });
    
    useEffect(() => {
        wasmPromise.then(
            (wasm: WasmModule) => {
            const scalenum = wasm.get_scalenum(rotate(Object.values(scaleUIState.notesOn), scaleUIState.tonic));
            const tonic = {num: scaleUIState.tonic, letter: noteNames[scaleUIState.tonic]};
            const pitchclassset: Uint16Array = wasm.build_pitchclassset(scalenum);
            const intervals = wasm.build_intervals(pitchclassset);
            setCurrentScale({scalenum, tonic, pitchclassset, intervals});

            //If the selected chord is not in the scale, reset it
            const notesOn = Object.entries(scaleUIState.notesOn)
                .filter(([_, isOn]) => isOn)
                .map(([noteNum]) => Number(noteNum));
            for(let i = 0; i < selectedChord.notes.length; i++) {
                if (!notesOn.includes(selectedChord.notes[i])) {
                    setSelectedChord({
                        tonic: {num: -1, letter: ""},
                        quality: "",
                        notes: new Uint16Array(0),
                    })
                }   
            }       
        });
    }, [scaleUIState]);

    useEffect(() => {
        console.log(scaleUIState);
        console.log(Object.keys(scaleUIState.notesOn));
        console.log(Object.values(scaleUIState.notesOn));
    }, [scaleUIState])

    return (
        <div className="my-4 flex flex-row">
            <section className="flex flex-col-reverse lg:flex-row max-h-screen px-8 mx-auto">
                <ChordButtons wasmPromise={wasmPromise} currentScale={currentScale} selectedChord={selectedChord} setSelectedChord={setSelectedChord}/>
                <div>   
                <header className="flex flex-row py-2"> 
                    <div className="flex justify-center w-28 mr-auto">
                        <AccidentalButton setNoteNames={setNoteNames}/>
                    </div>
                    <ScaleTitle wasmPromise={wasmPromise} currentScale={currentScale}/>
                </header>
                <ScaleRing scaleUIState={scaleUIState} setScaleUIState={setScaleUIState} selectedChord={selectedChord}/> 
                </div>
            </section>
            <div className="justify-center">
                <GuitarNeck scaleUIState={scaleUIState} setScaleUIState={setScaleUIState} selectedChord={selectedChord}/>
            </div>
        </div>
    )
}

export default ScaleContainer;