import React, { FC, useCallback, useEffect } from "react"
import { EndPointManagement, PointManagement } from "../CustomHooks/useConnectionManagement"
import { useDragableSVGComponent } from "../CustomHooks/useDraggableSVG"
import { Connection, IConnection } from "../UtilClasses/Connection"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import { IPoint, Point } from "../UtilClasses/Point"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = Pick<PointManagement, "addPoint" | "selectConnection" | "toggleIsLastPointMoving" | "onCoordsChange"> & {
    connection : IConnection,
    selected : boolean
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const points = props.connection.points;
    const connection = new Connection(props.connection)
    
    if (props.selected) {
        const edgePoints = (props.connection.points.slice(1, points.length - 1));
        const addPoints : Point[] = [];
    
        for (var i = 0; i <  points.length - 1; i++) {
            const beginCoords = new Coordinates(points[i].coords);
            const vector = new Coordinates(points[i+1].coords).sub(beginCoords).scale(1/2) // vektor mezi dvěma body vydělený dvěma
            const halfWayPoint = new Point({ id : `addPoint_${i}`, coords : beginCoords.add(vector), connectionsId : []});
            addPoints.push(halfWayPoint);
        }
        const lastPoint = points[points.length - 1];


    
        return (
            <g>
                <path className={style.edge}  markerEnd={"url(#arrow)"} d={connection.getPathDescription()}/>
                {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} onCoordsChange={props.onCoordsChange}/>)}
                {addPoints.map((item,index) => <AddPointSVG point={item} pointIndex={++index} connectionId={props.connection.id} key={item.id} addPoint={props.addPoint}/>)}
                <LastEdgePointSVG point={lastPoint} {...props}/>
            </g>
        )
    } else {
        const onClickHandler = () => {
            props.selectConnection(props.connection.id);
        }

        return (
            <g>
                <path className={style.edge} onClick={onClickHandler}  markerEnd={"url(#arrow)"} d={connection.getPathDescription()}/>
            </g>
        )
    }
}

type EdgePointSVGProps = {
    point : IPoint
    onCoordsChange : (point : IPoint) => void;
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
    point : IPoint
    pointIndex : number
    connectionId : string
}

const AddPointSVG : FC<AddPointSVGProps> = (props) => {

    const onClickHandler = () => {
        props.addPoint(props.connectionId, props.point, props.pointIndex)
    }
    return (
        <circle className={style.add_point} cx={props.point.coords.x} cy={props.point.coords.y} r={5} onClick={onClickHandler} />
    )
}


type LastEdgePointSVGProps = Pick<PointManagement, "toggleIsLastPointMoving"> & {
    point : IPoint
    onCoordsChange : (point : IPoint) => void;
}

const LastEdgePointSVG : FC<LastEdgePointSVGProps> = (props) => {
    const {coordinates, onMouseDownHandler, onMouseUpHandler} = useDragableSVGComponent(props.point.coords, props.toggleIsLastPointMoving, props.toggleIsLastPointMoving);
    
    useEffect(()=> {
        props.point.coords = coordinates;
        props.onCoordsChange(props.point);
    },[coordinates])


    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


