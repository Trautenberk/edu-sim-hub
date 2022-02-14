import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {useAppSelector, useAppDispatch} from "Store/Hooks"
import { endPointClicked, selectedEndPoint, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { Coordinates, ICoordinates} from "Components/Utilities/UtilClasses/Coordinates"
import { Point } from "../UtilClasses/Point"
import uniqid from "uniqid"
export type EndPointProps = {
    parentElementID : string,
    point : Point,
    groupCoordinates : ICoordinates,
    arrowDirection : Direction,
    addConnection : (points : Point[]) => void;
    onEndPointCoordsChange : (point: Point) => void;
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();


    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        // dispatch(endPointClicked(props.ID));
    }

    useEffect(() => {
        props.onEndPointCoordsChange(props.point)
    },[props.point])
  
    const style =  useSelector(state => selectedEndPoint(state)) === props.point.id ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.point.id));

    const onArrowClick = useCallback(() => {
        props.addConnection([props.point, new Point(uniqid(), {x : 50, y : 100})]);
    },[props])

    return(
        <>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} cx={props.groupCoordinates.x} cy={props.groupCoordinates.y} r={5}/>
            <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.arrowDirection}  coordinates={props.groupCoordinates} scale={1} />
        </>
    )   
}
