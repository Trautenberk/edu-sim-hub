import { Children, FC, MouseEventHandler, useContext, useEffect } from "react"
import { CanvasContext } from "../../Store/Editor/Canvas/CanvasContext";
import { useDragableSVGCompoennt } from "./CustomHooks/useDraggableSVG";

export const CanvasElementWrapper : FC = ({children}) => {
    const context = useContext(CanvasContext);

    const {
        coordinates : coordinates,
        setCoordinates: setCoordinates,
        canvasBoundaries : canvasBoundaries,
        mouseMoveEventHandler : mouseMoveEventHandler,
        onMouseDownHandler : onMouseDownHandler,
        onMouseUpHandler : onMouseUpHandler
    
    } = useDragableSVGCompoennt<SVGGElement>();

    canvasBoundaries.current = context.canvasBoundaries;

    useEffect(() => {
        setCoordinates(context.initPos);
    }, []);


    return(
        <g onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} transform={`translate(${coordinates.posX},${coordinates.posY})`}>
            {children}
        </g>
    )
}