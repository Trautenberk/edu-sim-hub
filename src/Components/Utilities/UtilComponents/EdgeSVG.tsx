import { FC, useEffect } from "react"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { Connection } from "../UtilClasses/Connection"
import { Point } from "../UtilClasses/Point"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = {
    connection : Connection,
    onChildPointsCoordsChange : (point : Point) => void;
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {

    const edgePoints = (props.connection.points.slice(1, props.connection.points.length));
    return (
        <g>
            <path className={style.edge} markerEnd={"url(#arrow)"} d={props.connection.getPathDescription()}/>
            {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} onCoordsChange={props.onChildPointsCoordsChange}/>)}
        </g>
    )
}

type EdgePointSVGProps = {
    point : Point
    onCoordsChange : (point : Point) => void;
}

const EdgePointsSVG : FC<EdgePointSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler} = useDragableSVGComponent(props.point.coords);
    
    useEffect(()=> {
        props.point.coords = coordinates;
        props.onCoordsChange(props.point);
    },[coordinates])
    
    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


