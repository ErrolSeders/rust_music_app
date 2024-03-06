import { useState, useCallback} from "react";
import { enforceanglebounds } from "@/utils/utils";

const useRotationalDrag = (svgRef: React.RefObject<SVGSVGElement>, angle: number, setAngle: (angle: number) => void) => {
    const [isDragging, setIsDragging] = useState(false);
    const [initialMouseAngle, setInitialMouseAngle] = useState(0);
    const [initialAngle, setInitialAngle] = useState(0);

    // We want an event handler which upon mouse click records the current mouse position
    // and then upon mouse move rotates the bracelet by an angle given by the distance the mouse has moved
    // upon mouse release, the bracelet stops rotating and the position of the bracelet is updated.

    const calculateAngle = useCallback((e: MouseEvent) => {
        if (!svgRef.current) return 0;
        const rect = svgRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const atan = Math.atan2(centerY - e.clientY, centerX - e.clientX);
        return atan * (180 / Math.PI);
    }, [svgRef]);

    const handleMouseDown = useCallback((e: React.MouseEvent<SVGCircleElement | SVGTextElement, MouseEvent>) => {
        e.preventDefault();
        setIsDragging(true);
        setInitialMouseAngle(calculateAngle(e.nativeEvent));
        setInitialAngle(angle);
    }, [calculateAngle, angle]);

    const snapangle = 30;

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const currentMouseAngle = calculateAngle(e);
            const angleDifference = currentMouseAngle - initialMouseAngle;
            let newangle = initialAngle + angleDifference;
            
            const nearestsnap = Math.round(newangle / snapangle) * snapangle;
            
            if (!e.buttons) {
                newangle = nearestsnap;
                setIsDragging(false);
            }

            newangle = enforceanglebounds(newangle);
            setAngle(newangle);
        }
    }, [isDragging, initialMouseAngle, initialAngle, calculateAngle, setAngle]);

    const handleMouseUp = useCallback(() => {
        setAngle(enforceanglebounds(Math.round(angle / snapangle) * snapangle));
        setIsDragging(false);
    }, [setAngle, angle]);

    return { isDragging, handleMouseDown, handleMouseMove, handleMouseUp };
};
export default useRotationalDrag;