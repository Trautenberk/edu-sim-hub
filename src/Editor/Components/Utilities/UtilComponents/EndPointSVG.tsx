import React, { FC, MouseEventHandler, useCallback, useEffect } from "react"
import styles from "./EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction } from "Editor/Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Editor/Store/Hooks"
import { registerEndPoint, unregisterEndPoint, updatePointCoords } from "Editor/Feature/SimObjectManagementSlice"
import { ArrowSVG } from "Editor/Components/Utilities/UtilComponents/ArrowSVG"
import { GroupPoint, IPoint, Point } from "../../../Model/UtilClasses/Point"
import { Coordinates, ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { selectedObjectId } from "Editor/Feature/SimObjectManagementSlice"

export type EndPointProps = {
    parentElementID : string,
    point : Point,
    coordinates : ICoordinates,
    arrowDirection : Direction,
    onAddObject? : (fistPoint  : IPoint, secondPoint: IPoint) => void;
}

export const EndPointSVG : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
    }
    
    useEffect(() => {
        dispatch(registerEndPoint({endPoint: props.point.toSerializableObj(), ownerId: props.parentElementID}));
        return (() => {dispatch(unregisterEndPoint(props.point.id))})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(
        () => {
            dispatch(updatePointCoords({id : props.point.id,  newCoords: props.point.coords.toSerializableObj()}));
        },[dispatch, props.point.coords, props.point.coords.x, props.point.coords.y, props.point.id]
    )

    const style = styles.end_point;
    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.parentElementID));
   
    const higlihghtVisible = convertToVisibility(useSelector(state => state.simObjectManagement.highlightedEndPoint) === props.point.id); // TODO

    const onArrowClick = useCallback(() => {
        const secondPoint = new Point(new Coordinates(convertDirectionToOffset(props.arrowDirection)).add(props.point.coords));
        props.onAddObject && props.onAddObject(props.point.toSerializableObj(), secondPoint.toSerializableObj());
    },[dispatch, props])

    return(
        <g transform={`translate(${props.coordinates.x} ${props.coordinates.y})`}>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} r={5}/>
            <circle visibility={higlihghtVisible} className={styles.helper_circle} r={15}/>
            <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.arrowDirection} scale={1} />
        </g>
    )   
}