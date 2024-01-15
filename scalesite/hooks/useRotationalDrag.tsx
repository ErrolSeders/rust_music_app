import { useState, useCallback, useEffect } from "react";

const enforceanglebounds = (angle: number) => {
    angle %= 360;
    if (angle <= 0) angle += 360;
    return angle;
}

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

    const handleMouseDown = useCallback((e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        e.preventDefault();
        setIsDragging(true);
        setInitialMouseAngle(calculateAngle(e));
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

        setAngle(prevAngle => {
            let newangle = Math.round(prevAngle / snapangle) * snapangle 
            newangle = enforceanglebounds(newangle);
            return newangle;
        });
        setIsDragging(false);
    }, [setAngle]);

    return { isDragging, handleMouseDown, handleMouseMove, handleMouseUp };
};
export default useRotationalDrag;