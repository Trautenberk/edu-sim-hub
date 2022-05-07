import { addPoint, selectedObjectId, selectObj, selectObject, selectPoints, toggleIsLastPointMoving, updatePointCoords } from "Editor/Feature/SimObjectManagementSlice"
import React, { FC, useCallback, useEffect, useState } from "react"
import { useDragable } from "../CustomHooks/useDraggable"
import { Edge, IEdge } from "../../../Model/UtilClasses/Edge"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { IPoint, Point } from "../../../Model/UtilClasses/Point"
import style from "./EdgeSVG.module.scss"
import { useStoreHooks } from "../CustomHooks"

export type EdgeSVGComponentProps = {
    id : string,
    value? : string | number
 }

 /**
  * Pomocná React komponenta pro vykreslení hrany.
  * @param props 
  * @returns React komponenta
  */
export const EdgeSVG : FC<EdgeSVGComponentProps> = (props) => {
    const { dispatch, useSelector } = useStoreHooks();

    // Zdrojový objekt ze skladu
    const edge = useSelector(state => selectObj(state,props.id)) as IEdge;
    // Body které tvoří hranu
    const points = useSelector(state => selectPoints(state, edge.pointsId));
    // Jestli je hrana vybraná
    const selected = edge.id === useSelector(selectedObjectId);
    // Poslední bod hrany, slouží ke spojování.
    const lastPoint = new Point(points[points.length - 1]);

    if (selected) {
        const edgePoints : Point[] = (points.slice(1, points.length - 1)).map(item => new Point(item));
        const addPoints : Point[] = [];
    
        // Konstrukce pomocných bodů, které jsou vždy v polovině vzdálenosti mezi dvěma body a slouží
        // k přidání dalších bodů do hrany
        for (var i = 0; i <  points.length - 1; i++) {  
            const beginCoords = new Coordinates(points[i].coords);
            const vector = new Coordinates(points[i+1].coords).sub(beginCoords).scale(1/2) // vektor mezi dvěma body vydělený dvěma
            const halfWayPoint = new Point({ id : `addPoint_${i}`, coords : beginCoords.add(vector)});
            addPoints.push(halfWayPoint);
        }

        return (
            <g>
                <path className={style.edge}  markerEnd={"url(#arrow)"} d={Edge.getPathDescription(points)}/>
                {edgePoints.map(item => <EdgePointsSVG point={item} key={item.id} {...props}/>)}
                {addPoints.map((item,index) => <AddPointSVG point={item} pointIndex={++index} edgeId={edge.id} key={item.id} />)}
                {props.value && <text x={lastPoint.coords.x - 20} y={lastPoint.coords.y - 10}>{props.value}</text>} 
                <LastEdgePointSVG point={lastPoint} {...props}/>
            </g>
        )
    } else {
        const onClickHandler = () => {
            dispatch(selectObject(edge.id));
        }   
            // TODO zlepsit vypis value - aby zohlednoval stupne a podle toho menil souradnice
        return (
            <g>
                <path className={style.edge} markerEnd={"url(#arrow)"} d={Edge.getPathDescription(points)}/>
                <path className={style.edge_pom} onClick={onClickHandler}   d={Edge.getPathDescription(points)}/>
                {props.value && <text x={lastPoint.coords.x - 20} y={lastPoint.coords.y - 10}>{props.value}</text>}
            </g>
        )
    }
}

type EdgePointSVGProps = {
    point : Point
}

/**
 * React komponenta bodu hrany
 * @param props 
 * @returns 
 */
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


/**
 * React komponenta pomocného bodu pro přidávání dalších bodů do hrany
 * @param props 
 * @returns 
 */
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

/**
 * React komponenta posledního bodu hrany.
 * Je potřeba ho odlišit od ostantích bodů, protože se použí pro spojování.
 * @param props 
 * @returns 
 */
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


