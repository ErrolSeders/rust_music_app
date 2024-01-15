'use client'

import {useState, useEffect, useRef} from 'react';
import useRotationalDrag from '../hooks/useRotationalDrag';
import { ANGLESTOTONICS } from '@/constants/constants';

interface ScaleRingProps {
    scaleUIState: any;
    setScaleUIState: React.Dispatch<React.SetStateAction<any>>;
    NOTES: {[key:number]:string};
    selectedChord: Chord;
}

const ScaleRing: React.FC<ScaleRingProps> = ({scaleUIState, setScaleUIState, NOTES, selectedChord}) => {
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
        <div className="relative flex mx-auto">
            <svg 
                ref={svgRef} 
                className='bg-green-500 rounded-full' 
                style={{width: '500px', height: '500px', transformOrigin: 'center'}} 
                viewBox="0 0 500 500" 
                transform={`rotate(${angle})`}
            >
                {links.map((_, i) => (
                    <ScaleRingElement 
                        key={i} noteNum={i} 
                        scaleUIState={scaleUIState}
                        setScaleUIState={setScaleUIState}
                        NOTES={NOTES}
                        rotation={360 / links.length * i} 
                        svgRef={svgRef} 
                        angle={angle} 
                        setAngle={setAngle}
                        selectedChord={selectedChord}
                    />
                ))}
            </svg>
        </div>
    );
};

interface ScaleRingElementProps {
    noteNum: number;
    scaleUIState: any;
    setScaleUIState: React.Dispatch<React.SetStateAction<any>>;
    NOTES: any;
    rotation: number;
    svgRef: React.RefObject<SVGSVGElement>;
    angle: number;
    setAngle: (angle: number) => void;
    selectedChord: Chord;
}

const ScaleRingElement: React.FC<ScaleRingElementProps> = ({ noteNum, scaleUIState, setScaleUIState, NOTES, rotation, angle, svgRef, setAngle, selectedChord}) => {  
    
    const [color, setColor] = useState('white');
    const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp } = useRotationalDrag(svgRef, angle, setAngle);

    const handleClick = () => {
        if (scaleUIState.notesOn[noteNum] === false) {
            setScaleUIState({...scaleUIState, notesOn: {...scaleUIState.notesOn, [noteNum]: true}});
        } else {
            setScaleUIState({...scaleUIState, notesOn: {...scaleUIState.notesOn, [noteNum]: false}});
        };
    };

    useEffect(() => {
        if (scaleUIState.notesOn[noteNum] === true) {
            setColor('grey');
        } else {
            setColor('white');
        }
    }, [scaleUIState])

    useEffect(() => {
        //Hightlight notes in the chord
        if (selectedChord.notes.includes(noteNum)) {
            setColor('green');
        } else {
            // Return to non-selected color
            if (scaleUIState.notesOn[noteNum] === true) {
                setColor('grey');
            } else {
                setColor('white');
            }
        }
    }, [selectedChord])

    useEffect(() => {

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, handleMouseDown, handleMouseUp, handleMouseMove]);

    const r = 120;
    const cx = 250 + r * Math.cos(rotation * Math.PI / 180);
    const cy = 250 + r * Math.sin(rotation * Math.PI / 180);

    return (
        <>
            <circle 
                cx={cx}
                cy={cy} 
                r="25" 
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
                {NOTES[noteNum]}
            </text>
        </>
    );
};

export default ScaleRing;
