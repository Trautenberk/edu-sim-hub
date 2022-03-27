import React, { FunctionComponent,  MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import { EndPointSVG } from "../Utilities/UtilComponents";
import {useAppDispatch, useAppSelector} from "Editor/Store/Hooks"
import {ALL_DIRECTIONS, convertToVisibility} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedObjectId} from "Editor/Feature/PointEdgeSelectionSlice"
import { ObjectSVGProps } from "Editor/Components/Canvas";
import { GroupPoint, IGroupPoint } from "Editor/Model/UtilClasses/Point";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IPlace } from "Editor/Model/PetriNets/Place";
import { useSelectable } from "../Utilities";
import styles from "./PlaceStyle.module.scss"
import { addObject } from "Editor/Feature/SimObjectManagementSlice";
import { Arch } from "Editor/Model/PetriNets/Arch";




export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.id));
    const obj = useSelector(state => state.simObjectManagement.objects[props.id]) as IPlace;    // TODO tady to pretypovani vyresit

    const {onMouseDown} = useSelectable(props.id, props.onMouseDownDragHandler)
    
    const endPointsInGroupCoords : ICoordinates[] = useMemo(() => ([
        {x : 30, y: 0},
        {x : -30, y: 0},
        {x : 0, y: 30},
        {x : 0, y: -30},
    ]), [])

    const onEdgeSpawn = useCallback(
        () => {
            dispatch(addObject(new Arch().toSerializableObj()))
        },[]
    )

    // TODO refaktorovat pro optimalizaci
    const absoluteCoords = props.groupAbsoluteCoordinates;
    const endPoints = useMemo (
        () => (endPointsInGroupCoords.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(absoluteCoords)}))), 
        [props.groupAbsoluteCoordinates]); 
    
    return(
        <>
            <circle className={styles.spot_foundation} onMouseDown={onMouseDown}  onMouseUp={props.onMouseUpDragHandler}  r="30"/>
            <circle visibility={visible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPointSVG onEdgeSpawn={onEdgeSpawn} key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-50" y="-50">{obj.label}</text>
            <text x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </>
    )
}

