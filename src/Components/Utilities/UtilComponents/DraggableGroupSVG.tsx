
import { FC, FunctionComponent } from "react"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { CanvasElementProps } from "../../Editor/Canvas";
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates";
import { Point } from "../UtilClasses/Point";


type DraggableGroupSVGProps = {
    coords : ICoordinates,
    id : string,
    addConnection : (points : Point[]) => void,
    onPointCoordsChange: (point : Point) => void;
    canvasElement : FunctionComponent<CanvasElementProps>;
}


export const DraggableGroupSVG : FC<DraggableGroupSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGComponent(new Coordinates(props.coords));

    const mapCanvasElementProps = () : CanvasElementProps => ({
       id : props.id,
       groupAbsoluteCoordinates : coordinates,
       onMouseDownHandler,
       onMouseUpHandler,
       addConnection: props.addConnection,
       onPointCoordsChange: props.onPointCoordsChange
    })

    return(
        <g transform={`translate(${coordinates.x},${coordinates.y})`}>
            {props.canvasElement(mapCanvasElementProps())}
            {props.children}
        </g>
    )
}