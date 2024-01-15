import { useState, useEffect } from "react";

interface GuitarNeckProps{
    scaleUIState: any;
    setScaleUIState: React.Dispatch<React.SetStateAction<any>>;
    NOTES: {[key:number]:string};
    selectedChord: Chord;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({scaleUIState, setScaleUIState, NOTES, selectedChord}) => {
    const [tuning, setTuning] = useState([4,9,2,7,11,4])
    
    const STRINGS = 6;
    const FRETS = 18;

    const handleTuningChange = (stringNum: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTuning = [...tuning];
        newTuning[stringNum] = Number(event.target.value);
        setTuning(newTuning);
    }

    return (
    <div className="flex flex-col"> 
        <div className="flex justify-between mb-4">
        {Array.from({ length: STRINGS }, (_, i) => (
            <input 
                key={`string-input-${i}`} 
                type="number" 
                value={tuning[i]} 
                onChange={(event) => handleTuningChange(i, event)}
                className="w-12 h-8 text-center"
            />
        ))}
    </div>
        <div className="grid grid-cols-7 gap-2">
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
                                NOTES={NOTES} />
                        ))}
                    </div>
                ))}
            </div>
    </div>
    )
}

const GuitarNeckElement = ({scaleUIState, setScaleUIState, selectedChord, noteNum, stringNum, fretNum, NOTES}) => {
    let [color, setColor] = useState("bg-slate-300");
    
    useEffect(() => {
        if (selectedChord.notes.includes(noteNum)) {
            if (selectedChord.tonic.num === noteNum) {
                setColor("bg-green-500")
            } else {
                setColor("bg-green-300")
            }
        } else {
            scaleUIState.notesOn[noteNum] ? setColor("bg-blue-500") : setColor("bg-slate-300");
        }
    }, [scaleUIState, selectedChord]);

    const handleClick = () => {
        scaleUIState.notesOn[noteNum] ? 
            setScaleUIState((prevScaleUIState) => ({...prevScaleUIState, notesOn: {...prevScaleUIState.notesOn, [noteNum]: false}})) : 
            setScaleUIState((prevScaleUIState) => ({...prevScaleUIState, notesOn: {...prevScaleUIState.notesOn, [noteNum]: true}}));
    }

    return (
        <button onClick={handleClick} className={`h-8 w-8 px-1 py-1 mt-2 justify-center border border_gray-3 rounded-full ${color}`}>
            {NOTES[noteNum]}
        </button>
    )
}

export default GuitarNeck;