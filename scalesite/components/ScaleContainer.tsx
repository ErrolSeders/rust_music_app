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

const rotate = (arr: Array<any>, k:number) => new Uint8Array(arr.slice(k).concat(arr.slice(0, k)));

const ScaleContainer = () => {

    const wasmPromise = useWasm();
    const {noteNames, setNoteNames} = useNoteNames();
    const [scaleUIState, setScaleUIState] = useState(ScaleUIState);
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
                .filter(([noteNum, isOn]) => isOn)
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
        console.log(currentScale);
    }, [currentScale])

    return (
        <div className="flex flex-row m-auto">
            <ChordButtons wasmPromise={wasmPromise} currentScale={currentScale} selectedChord={selectedChord} setSelectedChord={setSelectedChord}/>
            <div className="flex flex-col px-8 mx-auto">
                <div className="flex flex-row"> 
                    <div className="flex justify-center w-28 mr-auto py-2">
                        <AccidentalButton setNoteNames={setNoteNames}/>
                    </div>
                    <div className="mx-auto py-2 w-full">
                        <ScaleTitle wasmPromise={wasmPromise} currentScale={currentScale}/>
                    </div>
                </div>
                <ScaleRing scaleUIState={scaleUIState} setScaleUIState={setScaleUIState} selectedChord={selectedChord}/>   
            </div>
            <GuitarNeck scaleUIState={scaleUIState} setScaleUIState={setScaleUIState} selectedChord={selectedChord}/>
        </div>
    )
}

export default ScaleContainer;