import {FC, MouseEventHandler, useEffect, useRef} from "react"
import styles from "Styles/Editor//EndPoint.module.css"
import {convertToVisibility, Coordinates} from "Components/Utilities/UtilMethodsAndTypes"
import {selectSelectedElementID} from "Feature/ElementSelectionSlice"
import {useAppSelector, useAppDispatch} from "Store/Hooks"
import {registerEndPoint} from "Feature/CanvasContextSlice"
import uniqid from "uniqid"
import {selectEndPoint, selectedEndPoint} from "Feature/ElementSelectionSlice"
export type EndPointProps = {
    parentElementID : string,
    elementCoordinates : Coordinates,
    groupCoordinates? : Coordinates
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();
    const pointID = useRef(uniqid())
    const getCanvasCoords = () : Coordinates => {
        return {
            posX : (props.groupCoordinates?.posX ?? 0) + props.elementCoordinates.posX,
            posY : (props.groupCoordinates?.posY ?? 0) + props.elementCoordinates.posY
        } 
    }
    // console.log(`EndPointID: ${pointID.current} canvasCoordinates: ${JSON.stringify(getCanvasCoords())}`)

    const clickedHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        dispatch(selectEndPoint(pointID.current));
    }

    const style =  useSelector(state => selectedEndPoint(state)) === pointID.current ? styles.EndPointSelected : styles.EndPoint 
    const visible = convertToVisibility(useSelector(state => selectSelectedElementID(state) === props.parentElementID));

    useEffect(() => {
        dispatch(registerEndPoint({id: pointID.current, coords : getCanvasCoords()}))
    }, [])

    return(
        <circle onClick={clickedHandler} visibility={visible} className={style} 
        cx={props.elementCoordinates.posX} cy={props.elementCoordinates.posY}  r={5}/>
    )
}