/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
import useRotationalDrag from '@/hooks/useRotationalDrag';
import SetElementColor from '@/hooks/setElementColor';
import { ANGLESTOTONICS } from '@/constants/constants';

import pallete from '@/constants/pallete';
import { useNoteNames } from '@/contexts/NoteNameContext';
import { enforceanglebounds } from '@/utils/utils';

interface ScaleRingProps {
    scaleUIState: ScaleUIState;
    setScaleUIState: ReactSetter<ScaleUIState>;
    selectedChord: Chord;
}

const ScaleRing: React.FC<ScaleRingProps> = ({scaleUIState, setScaleUIState, selectedChord}) => {
    const [angle, setAngle] = useState(270);
    
    const svgRef = useRef<SVGSVGElement>(null);

    const links = Object.keys(scaleUIState.notesOn)

    useEffect(() => {
        if (angle % 30 === 0) {
        const newtonic = ANGLESTOTONICS[angle];
        setScaleUIState({...scaleUIState, tonic: newtonic});
        }
    }, [angle]);

    return (
        <div className="relative flex flex-col mx-auto">
            <svg 
                className="bg-ps1grey-600 rounded-full"
                ref={svgRef} 
                style={{width: '40vh', height: '40vh', transformOrigin: 'center'}} 
                viewBox="0 0 400 400" 
                transform={`rotate(${angle})`}
            >
                {links.map((_, i) => (
                    <ScaleRingElement 
                        key={i} noteNum={i} 
                        scaleUIState={scaleUIState} 
                        setScaleUIState={setScaleUIState}
                        rotation={360 / links.length * i} 
                        svgRef={svgRef} 
                        angle={angle} 
                        setAngle={setAngle}
                        selectedChord={selectedChord}
                    />
                ))}
            </svg>
            <div className="flex flex-row">
                <button className="bg-ps1blue-200 px-2 my-1 mx-1 rounded-md mr-auto" 
                        onClick={() => setAngle((prevAngle: number) => enforceanglebounds(prevAngle + 30))}>
                            Rotate left
                </button>
                <button className="bg-ps1blue-200 px-2 my-1 mx-1 rounded-md ml-auto" 
                        onClick={() => setAngle((prevAngle: number) => enforceanglebounds(prevAngle - 30))}>
                            Rotate right
                </button>
            </div>
        </div>
    );
};

interface ScaleRingElementProps {
    noteNum: number;
    scaleUIState: any;
    setScaleUIState: React.Dispatch<React.SetStateAction<any>>;
    rotation: number;
    svgRef: React.RefObject<SVGSVGElement>;
    angle: number;
    setAngle: (angle: number) => void;
    selectedChord: Chord;
}

const ScaleRingElement: React.FC<ScaleRingElementProps> = ({ noteNum, scaleUIState, setScaleUIState, rotation, angle, svgRef, setAngle, selectedChord}) => {  
    
    const {noteNames} = useNoteNames();
    const [color, setColor] = useState(pallete.ps1blue[200]);

    const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useRotationalDrag(svgRef, angle, setAngle);

    const handleClick = () => {
        if (scaleUIState.notesOn[noteNum] === false) {
            setScaleUIState({...scaleUIState, notesOn: {...scaleUIState.notesOn, [noteNum]: true}});
        } else {
            setScaleUIState({...scaleUIState, notesOn: {...scaleUIState.notesOn, [noteNum]: false}});
        };
    };

    SetElementColor(
        setColor, 
        selectedChord, 
        scaleUIState, 
        noteNum, 
        pallete.ps1blue[900], 
        pallete.ps1blue[700],
        pallete.ps1blue[200],
        pallete.ps1grey[100],
    )

    useEffect(() => {

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, handleMouseDown, handleMouseUp, handleMouseMove]);

    const r = 140;
    const cx = 200 + r * Math.cos(rotation * Math.PI / 180);
    const cy = 200 + r * Math.sin(rotation * Math.PI / 180);

    return (
        <>
            <circle 
                className="bg-interactable"
                cx={cx}
                cy={cy} 
                r="30" 
                stroke="black" 
                strokeWidth="3" 
                fill={color} 
                onMouseDown={handleMouseDown}
                onClick={handleClick}
            />
            <text 
                x={cx} 
                y={cy} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                style={{ userSelect: 'none' }} 
                transform={`rotate(${-angle}, ${cx}, ${cy})`}
                onMouseDown={handleMouseDown}
                onClick={handleClick}
            >
                {noteNames[noteNum]}
            </text>
        </>
    );
};

export default ScaleRing;
