import { useEffect, useState } from "react"

interface AccidentalButtonProps {
    useSharps: boolean;
    setUseSharps: (value: boolean) => void;
}

const AccidentalButton = ({ useSharps, setUseSharps }: AccidentalButtonProps) => {

    const handleClick = () => {
        setUseSharps(!useSharps)
    }

    return (
        <button 
        className={`bg-ps1blue-200 flex w-full items-center justify-center rounded-md px-2 mx-2`} 
        onClick={handleClick}> 
                {useSharps ? "Sharps" : "Flats"} 
        </button>
    )
}

export default AccidentalButton;