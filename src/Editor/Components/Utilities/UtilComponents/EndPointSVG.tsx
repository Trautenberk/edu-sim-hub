import React, { FC, MouseEventHandler, useCallback, useEffect } from "react"
import styles from "./EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Editor/Store/Hooks"
import { registerEndPoint, unregisterEndPoint, updatePointCoords } from "Editor/Feature/SimObjectManagementSlice"
import { ArrowSVG } from "Editor/Components/Utilities/UtilComponents/ArrowSVG"
import { EndPoint, EndPointType, GroupPoint, IEndPoint, IPoint, Point } from "../../../Model/UtilClasses/Point"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { selectedObjectId } from "Editor/Feature/SimObjectManagementSlice"
import { useStoreHooks } from "../CustomHooks"

export type EndPointProps = {
    endPoint : IEndPoint,
    coordinates : ICoordinates,
    onAddObject? : (fistPoint  : IPoint, secondPoint: IPoint) => void;
}

function isRestrictionMet(endPoint : IEndPoint, spawnedObjCnt : number) : boolean {
    return (endPoint.type === EndPointType.Restricted && endPoint.maxSpawnedObj && endPoint.maxSpawnedObj > spawnedObjCnt) as boolean;
}

export const EndPointSVG : FC<EndPointProps> = (props) => {
    const { dispatch, useSelector} = useStoreHooks();

    const spawnedObjCnt = useSelector(state => state.simObjectManagement.endPoints[props.endPoint.id].spawnedObjCnt);

    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.endPoint.ownerId));
   
    // const higlihghtVisible = convertToVisibility(useSelector(state => state.simObjectManagement.highlightedEndPoint) === props.endPoint.id);

    const onArrowClick = useCallback(() => {
        if (props.endPoint.type === EndPointType.Input || (props.endPoint.type !== EndPointType.Infinite && !isRestrictionMet(props.endPoint, spawnedObjCnt)) || !props.endPoint.arrowDirection) {
            console.warn("XXX");
            return;
        } 
        
        const secondPoint = new Point(new Coordinates(convertDirectionToOffset(props.endPoint.arrowDirection)).add(props.endPoint.coords));
        props.onAddObject && props.onAddObject(props.endPoint, secondPoint.toSerializableObj());
    },[dispatch, props])

    return(
        <g transform={`translate(${props.coordinates.x} ${props.coordinates.y})`}>
            <circle visibility={visible} className={styles.end_point} r={5}/>
            {/* <circle visibility={higlihghtVisible} className={styles.helper_circle} r={15}/> */}
            { ((props.endPoint.type === EndPointType.Infinite || (props.endPoint.type === EndPointType.Restricted && isRestrictionMet(props.endPoint, spawnedObjCnt)))) && props.endPoint.arrowDirection != null 
            && <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.endPoint.arrowDirection} scale={1} />}
        </g>
    )   
}