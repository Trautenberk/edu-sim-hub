import { FC, MouseEventHandler, useEffect} from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import {convertToVisibility, Direction} from "Components/Utilities/UtilMethodsAndTypes"
import {useAppSelector, useAppDispatch} from "Store/Hooks"
import {registerEndPoint, endPointClicked, updatePointCoords, unregisterEndPoint, selectedEndPoint, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
import { ArrowSVG } from "Components/Utilities/UtilComponents/ArrowSVG"
import { Coordinates } from "Components/Utilities/UtilClasses/Coordinates"
export type EndPointProps = {
    parentElementID : string,
    ID : string,
    coords : Coordinates,
    groupCoordinates? : Coordinates,
    arrowDirection : Direction
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();
    const coords : Coordinates = new Coordinates({
        x : (props.groupCoordinates?.x ?? 0) + props.coords.x,
        y : (props.groupCoordinates?.y ?? 0) + props.coords.y
    });

    const clickedHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        dispatch(endPointClicked(props.ID));
    }

    
    const style =  useSelector(state => selectedEndPoint(state)) === props.ID ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.ID));

    useEffect(() => {
        // dispatch(registerEndPoint({id: props.ID, coords}))
        // return () => {dispatch(unregisterEndPoint(props.ID))}
    }, [])

    useEffect(() => {
        // dispatch(updatePointCoords({id : props.ID, coords}));
    }, [coords])

    return(
        <>
            <circle onClick={clickedHandler} visibility={visible} className={style} cx={props.coords.x} cy={props.coords.y}  r={5}/>
            <ArrowSVG  visible={visible} direction={props.arrowDirection}  coordinates={props.coords} scale={1} />
        </>
        )   
}
