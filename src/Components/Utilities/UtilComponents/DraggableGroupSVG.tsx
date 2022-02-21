
import { FC, FunctionComponent } from "react"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { CanvasElementProps } from "../../Editor/Canvas";
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates";
import { EndPointManagement, PointManagement } from "../CustomHooks/useConnectionManagement";

export type DraggableGroupSVGProps = Pick<CanvasElementProps, "id"> & PointManagement & EndPointManagement & {
    coords : ICoordinates,      // počáteční souřadnice
    canvasElement : FunctionComponent<CanvasElementProps>;   // svg element který se má vykreslit
}

export const DraggableGroupSVG : FC<DraggableGroupSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGComponent(props.coords);

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