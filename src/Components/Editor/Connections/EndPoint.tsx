import {FC, MouseEventHandler, useContext, useEffect, useState} from "react"
import uniqid from "uniqid"
import { CanvasContext, Coordinates } from "../../../Store/Editor/Canvas/CanvasContext"
import { useConnectionPoint } from "../CustomHooks/useConnectionPoint"
import styles from "./EndPoint.module.css"


export type EndPointProps = {
    parentElementID : string,
    elementCoordinates : Coordinates,
    groupCoordinates? : Coordinates
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const context = useContext(CanvasContext);

    const {pointID, dispatchPointClicked, dispatchPointMoved} = useConnectionPoint()
    const getCanvasCoords = () : Coordinates => {
        return {
            posX : (props.groupCoordinates?.posX ?? 0) + props.elementCoordinates.posX,
            posY : (props.groupCoordinates?.posY ?? 0) + props.elementCoordinates.posY
        } 
    }
    // console.log(`EndPointID: ${pointID.current} canvasCoordinates: ${JSON.stringify(getCanvasCoords())}`)

    const clickedHandler : MouseEventHandler<SVGCircleElement> = (e) => {
        e.stopPropagation();
        dispatchPointClicked(getCanvasCoords());
    }

    const style =   context.isSelectedEndPoint(pointID.current) ? styles.EndPointSelected : styles.EndPoint 

    useEffect(() => {
        context.registerEndPoint({pointID: pointID.current, coords : getCanvasCoords() });
    }, [])

    return(
        <circle onClick={clickedHandler} visibility={context.getVisibility(props.parentElementID)} className={style} 
        cx={props.elementCoordinates.posX} cy={props.elementCoordinates.posY}  r={5}/>
    )
}