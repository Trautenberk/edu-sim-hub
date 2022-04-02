
import { FC, FunctionComponent, useCallback, useState, ElementRef, useEffect } from "react"
import { useDragable, useDragableRef } from "../CustomHooks/useDraggable"
import { ObjectSVGProps } from "../../Canvas";
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates";

export type DraggableGroupSVGProps = Pick<ObjectSVGProps, "id"> & {
    coords : ICoordinates,      // počáteční souřadnice
    canvasElement : FunctionComponent<ObjectSVGProps>;   // svg element který se má vykreslit
}

export const DraggableGroupSVG : FC<DraggableGroupSVGProps> = (props) => {
    const [coordinates, setCoordinates] = useState<ICoordinates>(props.coords);
    
    const onCoordsChange = useCallback((newCoords : ICoordinates) => {
        setCoordinates({...newCoords});
    },[])

    const { onMouseDownHandler, onMouseUpHandler} = useDragable({coordinates, onCoordsChange});

    const mapCanvasElementProps = () : ObjectSVGProps => ({
       groupAbsoluteCoordinates : coordinates,
       onMouseDownDragHandler : onMouseDownHandler,
       onMouseUpDragHandler : onMouseUpHandler,
       ...props    
    })

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}>
            {props.canvasElement(mapCanvasElementProps())}
            {props.children}
        </g>
    )
}


export type DraggableRefGroupSVGProps = {
    refObj : SVGElement | null,
    coords : ICoordinates,      // počáteční souřadnice
    onMouseDown? : (e : MouseEvent) => void,
    onMouseUp? : (e : MouseEvent) => void
}

export const DraggableRefGroupSVG : FC<DraggableRefGroupSVGProps> = (props) => {
    const [coordinates, setCoordinates] = useState<ICoordinates>(props.coords);
    
    const onCoordsChange = useCallback((newCoords : ICoordinates) => {
        setCoordinates({...newCoords});
    },[])

    const { onMouseDownHandler, onMouseUpHandler} = useDragableRef({coordinates, onCoordsChange, onMouseDown: props.onMouseDown, onMouseUp: props.onMouseUp});

    if (props.refObj != null) {
        props.refObj.addEventListener("mousedown", onMouseDownHandler);
        props.refObj.addEventListener("mouseup", onMouseUpHandler);
    }

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}>
            {props.children}
        </g>
    )
}