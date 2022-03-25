import { addPoint, getEdge, selectEdge, selectedEdge, selectPointsFromEdge, toggleIsLastPointMoving, updatePointCoords } from "Editor/Feature/PointEdgeSelectionSlice"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks"
import { useDragable } from "../CustomHooks/useDraggable"
import { Edge } from "../../../Model/UtilClasses/Edge"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { IPoint, Point } from "../../../Model/UtilClasses/Point"
import style from "./EdgeSVG.module.scss"

type EdgeSVGComponentProps = {
    edgeId : string
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const edge = useSelector(state => getEdge(state, props.edgeId));
    const points = useSelector(state => selectPointsFromEdge(state, edge.pointsId));
    const selected = edge.id === useSelector(selectedEdge);

    if (selected) {
        const edgePoints : Point[] = (points.slice(1, points.length - 1)).map(item => new Point(item));
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
                <path className={style.edge}  markerEnd={"url(#arrow)"} d={Edge.getPathDescription(points)}/>
                {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} {...props}/>)}
                {addPoints.map((item,index) => <AddPointSVG point={item} pointIndex={++index} edgeId={edge.id} key={item.id} />)}
                <LastEdgePointSVG point={lastPoint} {...props}/>
            </g>
        )
    } else {

        const onClickHandler = () => {
            dispatch(selectEdge(edge.id));
        }

        return (
            <g>
                <path className={style.edge} onClick={onClickHandler}  markerEnd={"url(#arrow)"} d={Edge.getPathDescription(points)}/>
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
    edgeId : string
}

const AddPointSVG : FC<AddPointSVGProps> = (props) => {
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(addPoint({edgeId: props.edgeId, point: props.point.toSerializableObj(), index: props.pointIndex}));
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
        dispatch(toggleIsLastPointMoving());
    },[dispatch])

    const {onMouseDownHandler, onMouseUpHandler} = useDragable({coordinates : point.coords, onCoordsChange, onMouseDown : onMouseDownAndUpHandler, onMouseUp : onMouseDownAndUpHandler});

    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


