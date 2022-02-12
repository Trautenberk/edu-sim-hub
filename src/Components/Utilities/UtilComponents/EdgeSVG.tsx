import {FC} from "react"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = {
    points : ICoordinates[]
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const points = props.points.map(item => new Coordinates(item));
    const pathDescription : string[] = [`M ${points[0].toString()}`];

    (points.slice(1, points.length - 1)).forEach(item => pathDescription.push(`L ${item.toString()}`));
    
    return (
        <g>
            <path className={style.edge} d={`${pathDescription.join(" ")}`}/>
            {points.map(item => <EdgePointsSVG coords={item}/>)}
        </g>
    )
}


type EdgePointSVGProps = {
    coords : Coordinates
}

const EdgePointsSVG : FC<EdgePointSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler} = useDragableSVGComponent(props.coords);
    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}