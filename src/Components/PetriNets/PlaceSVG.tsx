import React, { FunctionComponent,  MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import { EndPoint } from "../Utilities/UtilComponents/EndPoint";
import styles from "Styles/PetriNets/SpotStyle.module.scss"
import {useAppDispatch, useAppSelector} from "Store/Hooks"
import {ALL_DIRECTIONS, convertToVisibility} from "Components/Utilities/UtilMethodsAndTypes"
import {elementClicked, selectedElementID} from "Feature/PointEdgeSelectionSlice"
import { CanvasElementProps } from "Components/Editor/Canvas";
import { GroupPoint, IGroupPoint } from "Components/Utilities/UtilClasses/Point";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";


export const PlaceSVG : FunctionComponent<CanvasElementProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.id));

    const onMouseDown =  useCallback((e : React.MouseEvent) => {
        props.onMouseDownDragHandler(e);
        dispatch(elementClicked(props.id));
    },[dispatch, props])
    
    const endPointsInGroupCoords : ICoordinates[] = useMemo(() => ([
        {x : 30, y: 0},
        {x : -30, y: 0},
        {x : 0, y: 30},
        {x : 0, y: -30},
    ]), [])


    // TODO vyřešit aby to šlo takhle 
    // const [endPoints, setEndPoints] = useState<GroupPoint[]>(endPointsInGroupCoords.map((item, index) => new GroupPoint(`${props.id}_${index}`, props.groupAbsoluteCoordinates, item)))

    // useEffect(
    //     () => {
    //         endPoints.forEach(item => item.coords = props.groupAbsoluteCoordinates)
    //         setEndPoints([...endPoints])
    //     }
    //     ,[props.groupAbsoluteCoordinates] 
    // )

    const absoluteCoords = props.groupAbsoluteCoordinates;
    const endPoints = useMemo (
        () => (endPointsInGroupCoords.map((item, index) => new GroupPoint({id : `${props.id}_${index}`, groupCoords:  item, coords: new Coordinates(item).add(absoluteCoords)}))), 
        [props.groupAbsoluteCoordinates]); 
    

    return(
        <>
            <circle className={styles.spot} onMouseDown={onMouseDown} onMouseUp={props.onMouseUpDragHandler}   r="30"/>
            <circle visibility={visible} className={styles.spot_selected} r="30"/>
            {endPoints.map((item, index) => <EndPoint key={item.id}  parentElementID={props.id} point={item} arrowDirection={ALL_DIRECTIONS[index]} {...props} /> )}
        </>
    )
}

