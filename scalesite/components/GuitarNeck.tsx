import { NOTENAMESTONUMBERS } from "@/constants/constants";
import { useNoteNames } from "@/contexts/NoteNameContext";
import SetElementColor from "@/hooks/setElementColor";
import { useState } from "react";

interface GuitarNeckProps{
    scaleUIState: ScaleUIState;
    setScaleUIState: ReactSetter<ScaleUIState>;
    selectedChord: Chord;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({scaleUIState, setScaleUIState, selectedChord}) => {
    const {noteNames} = useNoteNames();
    const [tuning, setTuning] = useState([4,9,2,7,11,4])
    
    const STRINGS = 6;
    const FRETS = 18;

    const handleTuningChange = (stringNum: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTuning = [...tuning];
        newTuning[stringNum] = NOTENAMESTONUMBERS[event.target.value];
        setTuning(newTuning);
    }

    return (
    <div className="flex flex-col mx-auto p-2"> 
        <div className="ml-[5.2rem] flex justify-between mb-4">
        {Array.from({ length: STRINGS }, (_, i) => (
            <input 
                key={`string-input-${i}`} 
                type="text" 
                value={noteNames[tuning[i]]} 
                onChange={(event) => handleTuningChange(i, event)}
                className="w-8 h-8 rounded text-center items-center justify-center"
            />
        ))}
        </div>
        <div className="grid grid-cols-8">
                <div className="flex flex-col ">
                    {Array.from({ length: FRETS }, (_, j) => (
                        <div key={`fret-number-${j}`} className="py-1 my-1 flex items-center justify-center">
                            {j}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">  </div>
                {Array.from({ length: STRINGS }, (_, i) => (
                    <div key={`string-${i}`} className="flex flex-col">
                        {Array.from({ length: FRETS }, (_, j) => (
                                <GuitarNeckElement key={`fret-${j}`}
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
            </div>
    </div>
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
        "bg-ps1blue-900", 
        "bg-ps1blue-700", 
        "bg-ps1blue-200",
        "bg-ps1grey-100",
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
            <hr className="border-gray-3" />
        </>
    )
}

export default GuitarNeck;