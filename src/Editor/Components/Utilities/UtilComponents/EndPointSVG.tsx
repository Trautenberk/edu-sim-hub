import React, { FC, MouseEventHandler, useCallback, useEffect } from "react"
import styles from "./EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Editor/Store/Hooks"
import { registerEndPoint, unregisterEndPoint, updatePointCoords, visibleForConnection } from "Editor/Feature/SimObjectManagementSlice"
import { ArrowSVG } from "Editor/Components/Utilities/UtilComponents/ArrowSVG"
import { EndPoint, EndPointType, IEndPoint, IPoint, Point } from "../../../Model/UtilClasses/Point"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { selectedObjectId } from "Editor/Feature/SimObjectManagementSlice"
import { useStoreHooks } from "../CustomHooks"

export type EndPointProps = {
    endPointId : string,
    coordinates : ICoordinates,
    onAddObject? : (fistPoint  : IPoint, secondPoint: IPoint) => void;
}

function isRestrictionMet(endPoint : IEndPoint, spawnedObjCnt : number) : boolean {
    return (endPoint.type === EndPointType.Restricted && endPoint.maxSpawnedObj && endPoint.maxSpawnedObj > spawnedObjCnt) as boolean;
}


/**
 * React komponenta EndPointu.
 * Tato komponenta slouží k vykreslení jednotlivých endpointů v nadřazené komponentě. 
 * 
 * @param props 
 * @returns 
 */
export const EndPointSVG : FC<EndPointProps> = (props) => {
    const { dispatch, useSelector} = useStoreHooks();
    // Zobrazovaný endpoint ze skladu
    const endPointObj = useSelector(state => state.simObjectManagement.endPoints[props.endPointId]);
    // Jestli mají být zvýrazněny, protože byla nadřazená komponenta vybrána
    const selectedVisible = useSelector(state => selectedObjectId(state) === endPointObj.ownerId);
    // Jesltli má být endpoint zvýrazněn pro spojení
    const forConnectionVisible = useSelector(state => visibleForConnection(state, endPointObj.id));
    // Jeslti má být zvýrazněn pomocný kru označení
    const higlihghtVisible = convertToVisibility(useSelector(state => state.simObjectManagement.highlightedEndPoint) === endPointObj.id);

    // Handler vyvylaný po kliknutí na šipku z endpointu
    const onArrowClick = useCallback(() => {
        if (endPointObj.type === EndPointType.Input || (endPointObj.type !== EndPointType.Infinite && !isRestrictionMet(endPointObj, endPointObj.spawnedObjCnt)) || (endPointObj.arrowDirection == null)) {
            return;
        } 
        
        const secondPoint = new Point(new Coordinates(convertDirectionToOffset(endPointObj.arrowDirection)).add(endPointObj.coords));
        props.onAddObject && props.onAddObject(endPointObj, secondPoint.toSerializableObj());
    },[dispatch, props, endPointObj])

    return(
        <g transform={`translate(${props.coordinates.x} ${props.coordinates.y})`}>
            <circle visibility={convertToVisibility(selectedVisible || forConnectionVisible)} className={styles.end_point} r={5}/>
            <circle visibility={higlihghtVisible} className={styles.helper_circle} r={15}/>
            { ((endPointObj.type === EndPointType.Infinite || (endPointObj.type === EndPointType.Restricted && isRestrictionMet(endPointObj, endPointObj.spawnedObjCnt)))) && endPointObj.arrowDirection != null 
            && <ArrowSVG onClick={onArrowClick}  visible={convertToVisibility(selectedVisible)} direction={endPointObj.arrowDirection} scale={1} />}
        </g>
    )   
}