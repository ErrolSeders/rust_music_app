import { NOTENAMESTONUMBERS } from "@/constants/constants";
import { useNoteNames } from "@/contexts/NoteNameContext";
import SetElementColor from "@/hooks/setElementColor";
import { useEffect, useState } from "react";

interface GuitarNeckProps{
    scaleUIState: ScaleUIState;
    setScaleUIState: ReactSetter<ScaleUIState>;
    selectedChord: Chord;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({scaleUIState, setScaleUIState, selectedChord}) => {
    const {noteNames} = useNoteNames();
    const [tuning, setTuning] = useState([4,9,2,7,11,4])
    
    const STRINGS = 6;
    const FRETS = 19;

    const handleTuningChange = (stringNum: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTuning = [...tuning];
        newTuning[stringNum] = NOTENAMESTONUMBERS[event.target.value];
        setTuning(newTuning);

    }

    const importantFrets = [0, 3, 5, 7, 9, 12, 15, 17]

    return (
    <section className="flex flex-col mx-auto p-2"> 
        <header className="flex mb-4">
        {Array.from({ length: STRINGS }, (_, i) => (
            <input 
                key={`string-input-${i}`} 
                className="mx-1 w-8 h-8 bg-neutral-200 rounded-md text-center items-center justify-center"
                type="text"
                value={noteNames[tuning[i]]} 
                onChange={(event) => handleTuningChange(i, event)}
            />
        ))}
        </header>
        <div className="grid grid-cols-7">
                {Array.from({ length: STRINGS }, (_, i) => (
                    <div key={`string-${i}`} className="flex flex-col">
                        {Array.from({ length: FRETS }, (_, j) => (
                                <GuitarNeckElement key={`string-${i}-fret-${j}`}
                                scaleUIState={scaleUIState}
                                setScaleUIState={setScaleUIState}
                                selectedChord={selectedChord}
                                noteNum={(tuning[i] + j) % 12}
                                stringNum={i}
                                fretNum={j}
                                />
                        ))}
                    </div>
                ))}
                <aside className="flex flex-col ">
                    {/* Fret Numbers */}
                    {Array.from({ length: FRETS }, (_, j) => (
                        <div 
                            key={`fret-number-${j}`} 
                            className={
                                `${importantFrets.includes(j) ? 'text-red-900' : 'text-neutral-600'}
                                py-1 my-1 h-[33px] w-8 mx-1 text-center table-cell align-middle`
                            }>
                                {j}
                        </div>
                    ))}
                </aside>
        </div>
    </section>
    )
}

interface GuitarNeckElementProps {
    scaleUIState: ScaleUIState;
    setScaleUIState: ReactSetter<ScaleUIState>;
    selectedChord: Chord;
    noteNum: number;
    stringNum: number;
    fretNum: number;
}

const GuitarNeckElement: React.FC<GuitarNeckElementProps> = ({scaleUIState, setScaleUIState, selectedChord, noteNum, stringNum, fretNum}) => {
    
    const {noteNames} = useNoteNames();
    const [color, setColor] = useState("bg-noselect");
    
    SetElementColor(
        setColor, 
        selectedChord, 
        scaleUIState, 
        noteNum, 
        "bg-neutral-600", 
        "bg-neutral-500", 
        "bg-neutral-400",
        "bg-neutral-200",
    )

    const handleClick = () => {
        scaleUIState.notesOn[noteNum] ? 
            setScaleUIState((prevScaleUIState: ScaleUIState) => ({...prevScaleUIState, notesOn: {...prevScaleUIState.notesOn, [noteNum]: false}})) 
            :
            setScaleUIState((prevScaleUIState: ScaleUIState) => ({...prevScaleUIState, notesOn: {...prevScaleUIState.notesOn, [noteNum]: true}}));
    }

    return (
        <>
            <button onClick={handleClick} className={`h-8 w-8 my-1 mx-1 table-cell align-middle border border_gray-3 rounded-full ${color}`}>
                {noteNames[noteNum]}
            </button>
            <hr className="border-neutral-900" />
        </>
    )
}

export default GuitarNeck;