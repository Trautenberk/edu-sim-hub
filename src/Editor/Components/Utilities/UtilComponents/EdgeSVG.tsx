import { addPoint, selectedObjectId, selectObject, selectPoints, toggleIsLastPointMoving, updatePointCoords } from "Editor/Feature/SimObjectManagementSlice"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useDragable } from "../CustomHooks/useDraggable"
import { Edge, IEdge } from "../../../Model/UtilClasses/Edge"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { IPoint, Point } from "../../../Model/UtilClasses/Point"
import style from "./EdgeSVG.module.scss"
import { useStoreHooks } from "../CustomHooks"

export type EdgeSVGComponentProps = {
    id : string,
 }

export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const { dispatch, useSelector } = useStoreHooks();

    const edge = useSelector(state => state.simObjectManagement.objects[props.id]) as IEdge;
    const points = useSelector(state => selectPoints(state, edge.pointsId));
    const selected = edge.id === useSelector(selectedObjectId);

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
            dispatch(selectObject(edge.id));
        }

        return (
            <g>
                <path className={style.edge} markerEnd={"url(#arrow)"} d={Edge.getPathDescription(points)}/>
                <path className={style.edge_pom} onClick={onClickHandler}   d={Edge.getPathDescription(points)}/>
                
            </g>
        )
    }
}

type EdgePointSVGProps = {
    point : Point
}

const EdgePointsSVG : FC<EdgePointSVGProps> = (props) => {
    const { dispatch } = useStoreHooks();
    const point = props.point

    const onCoordsChange = useCallback((newCoords : ICoordinates) => {
        dispatch(updatePointCoords({id: props.point.id, newCoords : {x: newCoords.x, y: newCoords.y}}));

    },[dispatch, props.point.id])

    const { coordinates, onMouseDownHandler, onMouseUpHandler} = useDragable({initialCoordinates: point.coords, onCoordsChange});
    
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
    const { dispatch } = useStoreHooks();

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
    const { dispatch } = useStoreHooks();
    const point = props.point

    const onCoordsChange = useCallback((newCoords : Coordinates) => {
        dispatch(updatePointCoords({id : props.point.id, newCoords : newCoords.toSerializableObj()}));
    },[dispatch, props.point.id])

    const onMouseDownAndUpHandler = useCallback(() => {
        dispatch(toggleIsLastPointMoving());
    },[dispatch])

    const {coordinates, onMouseDownHandler, onMouseUpHandler } = useDragable({initialCoordinates : point.coords, onCoordsChange, onMouseDown : onMouseDownAndUpHandler, onMouseUp : onMouseDownAndUpHandler});

    return (
        <circle className={style.edge_point} cx={coordinates.x} cy={coordinates.y} r={5} onMouseDown={onMouseDownHandler} onMouseUp={onMouseUpHandler} />    
    )
}


