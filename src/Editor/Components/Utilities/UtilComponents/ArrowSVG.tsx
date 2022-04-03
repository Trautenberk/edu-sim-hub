import {FC} from "react"
import { ICoordinates } from "../../../Model/UtilClasses/Coordinates"
import { Direction, Visibility } from "../UtilMethodsAndTypes"
import styles from "./ArrowSVG.module.scss"

export type ArrowSVGComponentProps = {
    direction : Direction 
    visible : Visibility
    onClick : () => void
    scale? : number
}

export const ArrowSVG : FC<ArrowSVGComponentProps> = (props) => {
    const directionConvertor = () => {
        switch(props.direction){
            case Direction.Top:
                return "-90 0 0";
            case Direction.Right:
                return "0 0 0"
            case Direction.Down:
                return "90 0 0"
            case Direction.Left:
                return "180 0 0"
        }
    }

    return (
        <g visibility={props.visible} transform={`scale(${(props.scale ?? 1) * 0.7} ${(props.scale ?? 1)* 0.7}) rotate(${directionConvertor()})`}>
            <path d={`M 10 0 L 10 -5 L 35 -5 L 35 -10 L 50 0 L 35 10 L 35 5 L 10 5 L 10 0 Z`} onClick={props.onClick} className={styles.arrow} />
        </g>
    )
}