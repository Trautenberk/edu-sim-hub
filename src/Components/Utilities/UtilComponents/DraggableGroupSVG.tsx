
import { FC, FunctionComponent } from "react"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { CanvasElementProps } from "../../Editor/Canvas";
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates";


type DraggableGroupSVGProps = {
    coords : ICoordinates,
    id : string,
    canvasElement : FunctionComponent<CanvasElementProps>;
}


export const DraggableGroupSVG : FC<DraggableGroupSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler
    } = useDragableSVGComponent<SVGGElement>(new Coordinates(props.coords));

    const mapCanvasElementProps = () : CanvasElementProps => ({
       id : props.id,
       coordinates
    })

    return(
        <g onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} transform={`translate(${coordinates.x},${coordinates.y})`}>
            {props.canvasElement(mapCanvasElementProps())}
            {props.children}
        </g>
    )
}