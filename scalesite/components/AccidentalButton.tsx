import { useEffect, useState } from "react"

interface AccidentalButtonProps {
    useSharps: boolean;
    setUseSharps: (value: boolean) => void;
}

const AccidentalButton = ({ useSharps, setUseSharps }: AccidentalButtonProps) => {
    const [classname, setClassname] = useState("bg-blue-500 rounded-md")

    const flatclass = "bg-blue-500 rounded-md"
    const sharpclass = "bg-red-500 rounded-md"

    const handleClick = () => {
        useSharps ? setClassname(sharpclass) : setClassname(flatclass)
        setUseSharps(!useSharps)
    }

    return (
        <button className={classname} onClick={handleClick}> {useSharps ? "Sharps" : "Flats"} </button>
    )
}

export default AccidentalButton;