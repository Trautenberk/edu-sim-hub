import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import styles from "Styles/Editor//EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction, Visibility } from "Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Store/Hooks"
import { endPointClicked, selectedEndPoint, selectedObjectId, registerEndPoint, unregisterEndPoint, addEdge, updatePointCoords } from "Feature/PointEdgeSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { GroupPoint, IGroupPoint, IPoint, Point } from "../UtilClasses/Point"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"

export type EndPointProps = {
    parentElementID : string,
    point : GroupPoint,
    arrowDirection : Direction,
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        // dispatch(endPointClicked(props.point.id));
    }
    
    useEffect(() => {
        dispatch(registerEndPoint(props.point.toSerializableObj()));
        return (() => {dispatch(unregisterEndPoint(props.point.id))})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(
        () => {
            dispatch(updatePointCoords({id : props.point.id,  newCoords: props.point.coords.toSerializableObj()}));
        },[dispatch, props.point.coords, props.point.coords.x, props.point.coords.y, props.point.groupCoords, props.point.id]
    )

    const style =  useSelector(state => selectedEndPoint(state)) === props.point.id ? styles.end_point_selected : styles.end_point 
    const visible = convertToVisibility(useSelector(state => selectedObjectId(state) === props.parentElementID || selectedEndPoint(state) === props.point.id));
   
    const higlihghtVisible = convertToVisibility(useSelector(state => state.pointEdgeSelection.highlightedEndPoint) === props.point.id); // TODO


    const onArrowClick = useCallback(() => {
        const secondPointCoords  =  new Coordinates(convertDirectionToOffset(props.arrowDirection)).add(props.point.coords)
        const secondPoint = new Point({id : `Point_${Point.cnt}`, coords : secondPointCoords})
        dispatch(addEdge([props.point.toSerializableObj(), secondPoint.toSerializableObj()]))
    },[dispatch, props])

    return(
        <>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} cx={props.point.groupCoords.x} cy={props.point.groupCoords.y} r={5}/>
            <circle visibility={higlihghtVisible} className={styles.helper_circle} cx={props.point.groupCoords.x} cy={props.point.groupCoords.y} r={15}/>
            <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.arrowDirection}  coordinates={props.point.groupCoords} scale={1} />
        </>
    )   
}