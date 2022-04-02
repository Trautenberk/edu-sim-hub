import React, { FunctionComponent,  MouseEventHandler, useCallback, useEffect, useMemo, useState, useRef } from "react";
import { EndPointSVG } from "../Utilities/UtilComponents";
import {useAppDispatch, useAppSelector} from "Editor/Store/Hooks"
import {ALL_DIRECTIONS, convertToVisibility} from "Editor/Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedObjectId} from "Editor/Feature/PointEdgeSelectionSlice"
import { ObjectSVGProps } from "Editor/Components/Canvas";
import { GroupPoint, IGroupPoint } from "Editor/Model/UtilClasses/Point";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { IPlace } from "Editor/Model/PetriNets/Place";
import { useDragRef, useSelectable } from "../Utilities";
import styles from "./PlaceStyle.module.scss"
import { addObject } from "Editor/Feature/SimObjectManagementSlice";
import { Arch, OutputArch } from "Editor/Model/PetriNets/Arch";
import { DraggableRefGroupSVG } from "Editor/Components/Utilities/UtilComponents";
import { SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents/SelectableAndDraggableGroupSVG";


const placeEndPoints =  [
    {x : 30, y: 0},
    {x : -30, y: 0},
    {x : 0, y: 30},
    {x : 0, y: -30}
]

export const PlaceSVG : FunctionComponent<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.id));
    const obj = useSelector(state => state.simObjectManagement.objects[props.id]) as IPlace;    // TODO tady to pretypovani vyresit
    const {dragRef, setRef} = useDragRef()

    const onEdgeSpawn = useCallback(
        () => {
            // dispatch(addObject(new OutputArch(obj.id).toSerializableObj()))
        },[]
    )

    // TODO refaktorovat pro optimalizaci
    const absoluteCoords = props.groupAbsoluteCoordinates;
    const endPoints = useMemo (
        () => (placeEndPoints.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(absoluteCoords)}))), 
        [props.groupAbsoluteCoordinates]); 

    return(
        <SelectableAndDraggableGroupSVG refObj={dragRef} coords={props.groupAbsoluteCoordinates} id={props.id}>
            <circle ref={setRef} className={styles.spot_foundation} r="30"/>
            <circle visibility={visible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPointSVG onEdgeSpawn={onEdgeSpawn} key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
            <text x="-50" y="-50">{obj.label}</text>
            <text x="-10" y="5">{obj.tokenCount > 0 ? `${obj.tokenCount} x` : ""}</text>
        </SelectableAndDraggableGroupSVG>
    )
}


