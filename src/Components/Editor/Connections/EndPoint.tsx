import {FC, MouseEventHandler, useEffect} from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import {convertToVisibility, Coordinates} from "Components/Utilities/UtilMethodsAndTypes"
import {useAppSelector, useAppDispatch} from "Store/Hooks"
import {registerEndPoint, endPointClicked, updatePointCoords, unregisterEndPoint, selectedEndPoint, selectedElementID} from "Feature/PointConnectionAndSelectionSlice"
export type EndPointProps = {
    parentElementID : string,
    ID : string,
    elementCoordinates : Coordinates,
    groupCoordinates? : Coordinates
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();
    const coords : Coordinates = {
        posX : (props.groupCoordinates?.posX ?? 0) + props.elementCoordinates.posX,
        posY : (props.groupCoordinates?.posY ?? 0) + props.elementCoordinates.posY
    };

    const clickedHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        dispatch(endPointClicked(props.ID));
    }

    
    const style =  useSelector(state => selectedEndPoint(state)) === props.ID ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectedElementID(state) === props.parentElementID || selectedEndPoint(state) === props.ID));

    useEffect(() => {
        dispatch(registerEndPoint({id: props.ID, coords}))
        return () => {dispatch(unregisterEndPoint(props.ID))}
    }, [])

    useEffect(() => {
        dispatch(updatePointCoords({id : props.ID, coords}));
    }, [coords])

    return(
        <circle onClick={clickedHandler} visibility={visible} className={style} 
        cx={props.elementCoordinates.posX} cy={props.elementCoordinates.posY}  r={5}/>
    )
}