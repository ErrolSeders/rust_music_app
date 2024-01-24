/* eslint-disable react-hooks/exhaustive-deps */
import { NOTENUMBERSFLATS, NOTENUMBERSSHARPS } from "@/constants/constants";
import { useEffect, useState } from "react"

interface AccidentalButtonProps {
    setNoteNames: ReactSetter<NoteNames>;
}

const AccidentalButton = ({ setNoteNames }: AccidentalButtonProps) => {
    const [useSharps, setUseSharps] = useState(false);

    const handleClick = () => {
        setUseSharps(!useSharps)
    }

    useEffect(() => {
        setNoteNames(useSharps ? NOTENUMBERSSHARPS : NOTENUMBERSFLATS);
    }, [useSharps]);

    return (
        <button 
        className={`bg-ps1blue-200 flex w-full items-center justify-center rounded-md px-2 mx-2`} 
        onClick={handleClick}> 
                {useSharps ? "Sharps" : "Flats"} 
        </button>
    )
}

export default AccidentalButton;