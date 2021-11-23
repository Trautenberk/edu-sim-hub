import {FC, MouseEventHandler, useContext} from "react"
import { CanvasContext, Coordinates } from "../../../Store/Editor/Canvas/CanvasContext"
import styles from "./ConnectionPoint.module.css"


type ConnectionPointProps = {
    parentElementID : string;
    coordinates : Coordinates
}

export const ConnectionPoint : FC<ConnectionPointProps> = (props) => {
    const context = useContext(CanvasContext);

    const clickedHandler : MouseEventHandler = (e) => {

    }

    return(
        <circle visibility={context.getVisibility(props.parentElementID)} className={styles.ConnectionPoint} 
        cx={props.coordinates.posX} cy={props.coordinates.posY}  r={5}/>
    )
}