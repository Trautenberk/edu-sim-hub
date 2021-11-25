import {FC, MouseEventHandler, useContext, useEffect, useState} from "react"
import uniqid from "uniqid"
import { CanvasContext, Coordinates } from "../../../Store/Editor/Canvas/CanvasContext"
import { useConnectionPoint } from "../CustomHooks/useConnectionPoint"
import styles from "./EndPoint.module.css"


export type EndPointProps = {
    parentElementID : string,
    coordinates : Coordinates,
    canvasCoordinates? : Coordinates
}

export const EndPoint : FC<EndPointProps> = (props) => {
    const context = useContext(CanvasContext);

    const {pointID, dispatchPointClicked, dispatchPointMoved} = useConnectionPoint()

    console.log(`EndPoint canvasCoordinates: ${JSON.stringify(props.canvasCoordinates)}`)

    useEffect(() => {
    }, [])

    return(
        <circle onClick={dispatchPointClicked} visibility={context.getVisibility(props.parentElementID)} className={styles.EndPoint} 
        cx={props.coordinates.posX} cy={props.coordinates.posY}  r={5}/>
    )
}