import { addPoint, getConnection, selectConnection, selectCoordinates, selectedConnection, selectPointsFromConnection, toggleIsLastPointMoving, updatePointCoords } from "Feature/PointConnectionAndSelectionSlice"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "Store/Hooks"
import { useDragable } from "../CustomHooks/useDraggable"
import { Connection, IConnection } from "../UtilClasses/Connection"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import { IPoint, Point } from "../UtilClasses/Point"
import style from "./UtilComponentsStyle/EdgeSVG.module.scss"

type EdgeSVGComponentProps = {
    connectionId : string
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const connection = useSelector(state => getConnection(state, props.connectionId));
    const points = useSelector(state => selectPointsFromConnection(state, connection.pointsId));
    const connectionInstance = new Connection(connection, points); 
    const selected = connection.id === useSelector(selectedConnection);

    if (selected) {
        const edgePoints = (points.slice(1, points.length - 1)).map(item => new Point(item));
        const addPoints : Point[] = [];
    
        for (var i = 0; i <  points.length - 1; i++) {
            const beginCoords = new Coordinates(points[i].coords);
            const vector = new Coordinates(points[i+1].coords).sub(beginCoords).scale(1/2) // vektor mezi dvěma body vydělený dvěma
            const halfWayPoint = new Point({ id : `addPoint_${i}`, coords : beginCoords.add(vector)});
            addPoints.push(halfWayPoint);
        }
        const lastPoint = new Point(points[points.length - 1]);


    
        return (
            <g>
                <path className={style.edge}  markerEnd={"url(#arrow)"} d={connectionInstance.getPathDescription()}/>
                {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} {...props}/>)}
                {addPoints.map((item,index) => <AddPointSVG point={item} pointIndex={++index} connectionId={connection.id} key={item.id} />)}
                <LastEdgePointSVG point={lastPoint} {...props}/>
            </g>
        )
    } else {

        const onClickHandler = () => {
            dispatch(selectConnection(connection.id));
        }

        return (
            <g>
                <path className={style.edge} onClick={onClickHandler}  markerEnd={"url(#arrow)"} d={connectionInstance.getPathDescription()}/>
            </g>
        )
    }
}

type EdgePointSVGProps = {
    point : Point
}

const EdgePointsSVG : FC<EdgePointSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const point = props.point
    const [coordinates, setCoordinates] = useState<ICoordinates>(props.point.coords);

    const onCoordsChange = useCallback((newCoords : ICoordinates) => {
        setCoordinates(newCoords);
        dispatch(updatePointCoords({id: props.point.id, newCoords : {x: newCoords.x, y: newCoords.y}}));

    },[dispatch, props.point.id])

    const {onMouseDownHandler, onMouseUpHandler} = useDragable({coordinates: point.coords, onCoordsChange});
    
    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


type AddPointSVGProps = {
    point : Point
    pointIndex : number
    connectionId : string
}

const AddPointSVG : FC<AddPointSVGProps> = (props) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(addPoint({connectionId: props.connectionId, point: props.point.toSerializableObj(), index: props.pointIndex}));
    }

    return (
        <circle className={style.add_point} cx={props.point.coords.x} cy={props.point.coords.y} r={5} onClick={onClickHandler} />
    )
}


type LastEdgePointSVGProps = {
    point : Point
}

const LastEdgePointSVG : FC<LastEdgePointSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const [coordinates, setCoordinates] = useState<ICoordinates>(props.point.coords.toSerializableObj());

    const point = props.point

    const onCoordsChange = useCallback((newCoords : Coordinates) => {
        setCoordinates(newCoords.toSerializableObj());
        dispatch(updatePointCoords({id : props.point.id, newCoords : newCoords.toSerializableObj()}));
    },[dispatch, props.point.id])

    const onMouseDownAndUpHandler = useCallback(() => {
        dispatch(toggleIsLastPointMoving);
    },[dispatch])

    const {onMouseDownHandler, onMouseUpHandler} = useDragable({coordinates : point.coords, onCoordsChange, onMouseDown : onMouseDownAndUpHandler, onMouseUp : onMouseDownAndUpHandler});

    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


