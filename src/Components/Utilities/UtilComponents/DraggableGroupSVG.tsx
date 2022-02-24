
import { FC, FunctionComponent, useCallback, useState } from "react"
import { useDragable } from "../CustomHooks/useDraggable"
import { CanvasElementProps } from "../../Editor/Canvas";
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates";

export type DraggableGroupSVGProps = Pick<CanvasElementProps, "id"> & {
    coords : ICoordinates,      // počáteční souřadnice
    canvasElement : FunctionComponent<CanvasElementProps>;   // svg element který se má vykreslit
}

export const DraggableGroupSVG : FC<DraggableGroupSVGProps> = (props) => {
    const [coordinates, setCoordinates] = useState<ICoordinates>(props.coords);
    
    const onCoordsChange = useCallback((newCoords : ICoordinates) => {
        setCoordinates({...newCoords});
    },[])

    const { onMouseDownHandler, onMouseUpHandler} = useDragable({coordinates, onCoordsChange});

    const mapCanvasElementProps = () : CanvasElementProps => ({
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