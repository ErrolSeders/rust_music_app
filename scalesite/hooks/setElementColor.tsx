/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";



const SetElementColor = (
    setColor: React.Dispatch<React.SetStateAction<string>>, 
    selectedChord: Chord, 
    scaleUIState: any, 
    noteNum: number, 
    tonicColor: string,
    inchordColor: string,
    inscaleColor: string,
    noselectColor:string 
    ) => {
    useEffect(() => {
        if (isNaN(noteNum)) {
            setColor(noselectColor)
        } else {
            setColor(
                selectedChord.notes.includes(noteNum) ?
                    selectedChord.tonic.num === noteNum ?
                        tonicColor :
                        inchordColor 
                    : scaleUIState.notesOn[noteNum] ?
                        inscaleColor :
                        noselectColor
            )
        }
    }
    ,[noteNum, scaleUIState, selectedChord]);
}

export default SetElementColor;