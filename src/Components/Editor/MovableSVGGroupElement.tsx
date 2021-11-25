
import React, { Children, FC, MouseEventHandler, useContext, useEffect, useRef, useState, cloneElement, ReactElement, isValidElement } from "react"
import { CanvasContext, Coordinates } from "../../Store/Editor/Canvas/CanvasContext";
import { EndPoint, EndPointProps } from "./Connections/EndPoint";
import { useDragableSVGCompoennt } from "./CustomHooks/useDraggableSVG";




export const MovableSVGGroupElement : FC = ({children}) => {
    const context = useContext(CanvasContext);
    const [coordinates, setCoordinates] = useState<Coordinates>({posX: 0, posY: 0})

    const {
        canvasBoundaries : canvasBoundaries,
        onMouseDownHandler : onMouseDownHandler,
        onMouseUpHandler : onMouseUpHandler
    
    } = useDragableSVGCompoennt<SVGGElement>(setCoordinates);

    canvasBoundaries.current = context.canvasBoundaries;

    useEffect(() => {
        setCoordinates(context.initPos);
        canvasBoundaries.current = context.canvasBoundaries;
    }, []);


    const childrenWithCoords = Children.map(children, child => {
        if (isValidElement(child)) {
            if(child.type == EndPoint )
                return cloneElement(child as ReactElement<EndPointProps>, {canvasCoordinates : coordinates} )
        }
        return child;
        });


    if(children != null){
     
    return(

        <g onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} transform={`translate(${coordinates.posX},${coordinates.posY})`}>
            {childrenWithCoords}
        </g>
    )   
    }
    else{
        return (<> </>)
    }
}