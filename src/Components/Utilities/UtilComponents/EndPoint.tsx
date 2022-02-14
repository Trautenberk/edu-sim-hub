import { FC, MouseEventHandler, useCallback, useEffect } from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import { convertToVisibility, Direction } from "Components/Utilities/UtilMethodsAndTypes"
import { useAppSelector, useAppDispatch } from "Store/Hooks"
import { endPointClicked, selectedEndPoint, selectedElementID } from "Feature/PointConnectionAndSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { GroupPoint, Point } from "../UtilClasses/Point"
import uniqid from "uniqid"
export type EndPointProps = {
    parentElementID : string,
    point : GroupPoint,
    arrowDirection : Direction,
    addConnection : (points : Point[]) => void;
    onEndPointCoordsChange : (point: Point) => void;
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const clickedEndPontHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        // dispatch(endPointClicked(props.point.id));
    }

    useEffect(() => {
        props.onEndPointCoordsChange(props.point)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.point])
  
    const style =  useSelector(state => selectedEndPoint(state)) === props.point.id ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.point.id));

    const onArrowClick = useCallback(() => {
        props.addConnection([props.point, new Point(uniqid(), {x : 50, y : 100})]);
    },[props])

    return(
        <>
            <circle onClick={clickedEndPontHandler} visibility={visible} className={style} cx={props.point.groupCoords.x} cy={props.point.groupCoords.y} r={5}/>
            <ArrowSVG onClick={onArrowClick}  visible={visible} direction={props.arrowDirection}  coordinates={props.point.groupCoords} scale={1} />
        </>
    )   
}
