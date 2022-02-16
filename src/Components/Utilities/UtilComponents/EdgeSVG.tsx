import React, { FC, useEffect } from "react"
import { PointManagement } from "../CustomHooks/useConnectionManagement"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { Connection } from "../UtilClasses/Connection"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import { Point } from "../UtilClasses/Point"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = Pick<PointManagement, "addPoint"> & {
    connection : Connection,
    onChildPointsCoordsChange : (point : Point) => void;
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const points = props.connection.points;
    const edgePoints = (props.connection.points.slice(1, points.length));
    const addPoints : Point[] = [];

    for (var i = 0; i <  points.length - 1; i++) {
        const beginCoords = new Coordinates(points[i].coords);
        const vector = new Coordinates(points[i+1].coords).sub(beginCoords).scale(1/2) // vektor mezi dvěma body vydělený dvěma
        const halfWayPoint = new Point(`addPoint_${i}`, beginCoords.add(vector));
        addPoints.push(halfWayPoint);
    }

    return (
        <g>
            <path className={style.edge} markerEnd={"url(#arrow)"} d={props.connection.getPathDescription()}/>
            {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} onCoordsChange={props.onChildPointsCoordsChange}/>)}
            {addPoints.map(item => <AddPointSVG point={item} connectionId={props.connection.id} key={item.id} addPoint={props.addPoint}/>)}
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


type AddPointSVGProps = Pick<PointManagement, "addPoint"> & {
    point : Point
    connectionId : string,
}

const AddPointSVG : FC<AddPointSVGProps> = (props) => {

    const onClickHandler = () => {
        console.log("addPoint");
        // props.addPoint(props.connectionId, props.point)
    }
    return (
        <circle className={style.edge_point} fill={"red"} cx={props.point.coords.x} cy={props.point.coords.y} r={5} onClick={onClickHandler} />
    )
}


