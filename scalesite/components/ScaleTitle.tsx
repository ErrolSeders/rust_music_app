/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react";

interface ScaleTitleProps {
    wasmPromise: Promise<WasmModule>;
    currentScale: Scale;
    NOTES: {[key:number]:string};
}

const ScaleTitle: React.FC<ScaleTitleProps> = ({wasmPromise, currentScale, NOTES}) => {
    
    const [scalename, setScalename] = useState("Unidentified Scale");

    useEffect(() => {  
        wasmPromise.then(
            (wasm: WasmModule) => {
            const scaletype = wasm.get_scalename(currentScale.scalenum);
            const tonic = NOTES[currentScale.tonic.num]
            setScalename(`${tonic} ${scaletype}`);
        })
    }, [currentScale, NOTES]);
    
    return (
        <div className="flex bg-ps1blue-200 px-2 rounded-md flex-row">
            <h1 className="mr-auto">{scalename}</h1>
            <h1 className="ml-auto">{currentScale.scalenum}</h1>
        </div>
    )
}

export default ScaleTitle;


