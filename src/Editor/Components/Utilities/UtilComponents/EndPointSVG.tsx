import React, { FC, MouseEventHandler, useCallback, useEffect } from "react"
import styles from "./EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Editor/Store/Hooks"
import { registerEndPoint, unregisterEndPoint, updatePointCoords } from "Editor/Feature/SimObjectManagementSlice"
import { ArrowSVG } from "Editor/Components/Utilities/UtilComponents/ArrowSVG"
import { EndPoint, GroupPoint, IEndPoint, IPoint, Point } from "../../../Model/UtilClasses/Point"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { selectedObjectId } from "Editor/Feature/SimObjectManagementSlice"

export type EndPointProps = {
    endPoint : IEndPoint,
    coordinates : ICoordinates,
    onAddObject? : (fistPoint  : IPoint, secondPoint: IPoint) => void;
}

export const EndPointSVG : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
    }
    

    const style = styles.end_point;
    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.endPoint.ownerId));
   
    const higlihghtVisible = convertToVisibility(useSelector(state => state.simObjectManagement.highlightedEndPoint) === props.endPoint.id); // TODO

    const onArrowClick = useCallback(() => {
        if (props.endPoint.inputOnly || props.endPoint.arrowDirection == null)
            return;
        
        const secondPoint = new Point(new Coordinates(convertDirectionToOffset(props.endPoint.arrowDirection)).add(props.endPoint.coords));
        props.onAddObject && props.onAddObject(props.endPoint, secondPoint.toSerializableObj());
    },[dispatch, props])

    return(
        <g transform={`translate(${props.coordinates.x} ${props.coordinates.y})`}>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} r={5}/>
            <circle visibility={higlihghtVisible} className={styles.helper_circle} r={15}/>
            {!props.endPoint.inputOnly && props.endPoint.arrowDirection != null && <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.endPoint.arrowDirection} scale={1} />}
        </g>
    )   
}