import { FC, MouseEventHandler, useState } from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {useAppSelector, useAppDispatch} from "Store/Hooks"
import { endPointClicked, selectedEndPoint, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates"
import { Point } from "../UtilClasses/Point"
export type EndPointProps = {
    parentElementID : string,
    point : Point,
    groupCoordinates? : Coordinates,
    arrowDirection : Direction
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();


    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        // dispatch(endPointClicked(props.ID));
    }

    const onArrowClickHandler = () => {}

    
    const style =  useSelector(state => selectedEndPoint(state)) === props.point.id ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.point.id));

    return(
        <>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} cx={props.point.coords.x} cy={props.point.coords.y} r={5}/>
            <ArrowSVG  visible={visible} direction={props.arrowDirection}  coordinates={props.point.coords} scale={1} />
        </>
        )   
}
