import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react"
import styles from "Styles/Editor//EndPoint.module.scss"
import { convertDirectionToOffset, convertToVisibility, Direction, Visibility } from "Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Store/Hooks"
import { endPointClicked, selectedEndPoint, selectedElementID } from "Feature/PointConnectionAndSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { GroupPoint, IGroupPoint, IPoint, Point } from "../UtilClasses/Point"
import { Coordinates, ICoordinates } from "../UtilClasses/Coordinates"
import { EndPointManagement, PointManagement } from "../CustomHooks/useConnectionManagement"

export type EndPointProps =  EndPointManagement & Pick<PointManagement, "addConnection" | "onCoordsChange"> & {
    parentElementID : string,
    point : IGroupPoint,
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
        props.onCoordsChange(props.point)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.point])

    useEffect(() => {
        props.registerEndPoint(props.point);
        return (() => {props.unregisterEndPoint(props.point.id)})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  
    const style =  useSelector(state => selectedEndPoint(state)) === props.point.id ? styles.end_point_selected : styles.end_point 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.point.id));
    const higlihghtVisible = convertToVisibility(props.highlightedEndPoint?.id === props.point.id);
    if (props.highlightedEndPoint != null) {
        // console.log(`test ${props.highlightedEndPoint.id}`)
    }
    
    const onArrowClick = useCallback(() => {
        const secondPointCoords : ICoordinates =  new Coordinates(convertDirectionToOffset(props.arrowDirection)).add(props.point.coords)
        props.addConnection([props.point, new Point({id : `Point_${Point.cnt}`, coords : secondPointCoords, connectionsId: []})])
    },[props])

    return(
        <>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} cx={props.point.groupCoords.x} cy={props.point.groupCoords.y} r={5}/>
            <circle visibility={higlihghtVisible} className={styles.helper_circle} cx={props.point.groupCoords.x} cy={props.point.groupCoords.y} r={15}/>
            <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.arrowDirection}  coordinates={props.point.groupCoords} scale={1} />
        </>
    )   
}