'use client'
import { useEffect, useState } from "react";

interface ScaleTitleProps {
    wasmModule: any;
    currentScale: Scale;
    NOTES: {[key:number]:string};
}

const ScaleTitle: React.FC<ScaleTitleProps> = ({wasmModule, currentScale, NOTES}) => {
    
    const [scalename, setScalename] = useState("Unidentified Scale");

    useEffect(() => {  
        wasmModule.then((wasm) => {
            const scaletype = wasm.get_scalename(currentScale.scalenum);
            const tonic = NOTES[currentScale.tonic.num]
            setScalename(`${tonic} ${scaletype}`);
        })
    }, [currentScale, NOTES]);
    
    return (
        <div className="flex flex-row">
            <h1 className="mr-auto">{scalename}</h1>
            <h1 className="ml-auto">{currentScale.scalenum}</h1>
        </div>
    )
}

export default ScaleTitle;


