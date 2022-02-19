import {FC} from "react"
import { ICoordinates } from "../UtilClasses/Coordinates"
import { Direction, Visibility } from "../UtilMethodsAndTypes"
import styles from "./UtilComponentsStyle/ArrowSVG.module.scss"

export type ArrowSVGComponentProps = {
    direction : Direction 
    coordinates : ICoordinates
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
        <g visibility={props.visible}  transform={`translate(${props.coordinates.x} ${props.coordinates.y}) scale(${(props.scale ?? 1) * 0.7} ${(props.scale ?? 1)* 0.7}) rotate(${directionConvertor()})`}>
            <g transform={`translate(10 0)`}>
                <path d={`M 0 0 L 0 -5 L 25 -5 L 25 -10 L 40 0 L 25 10 L 25 5 L 0 5 L 0 0 Z`} onClick={props.onClick} className={styles.arrow} />
            </g>
        </g>
    )
}