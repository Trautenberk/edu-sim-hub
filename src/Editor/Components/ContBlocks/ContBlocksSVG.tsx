import  React, { FC, useRef } from "react"
import { Coordinates, DraggableHandlers } from "Editor/Components/Utilities"
import { EndPointSVG } from "Editor/Components/Utilities/UtilComponents"
import { Direction } from "../Utilities/UtilMethodsAndTypes"
import { GroupPoint, IEndPointBrief } from "../../Model/UtilClasses/Point"
import { ObjectSVGProps } from "App"
import { ICoordinates } from "../../Model/UtilClasses/Coordinates"
import styles from "./ContBlockStyles.module.scss"


type ContBlockProps = DraggableHandlers

export const ContBlockFoundationSVG : FC<ContBlockProps> = (props) => {    
    return (
            <rect className={styles.foundation} onMouseDown={props.onMouseDownDragHandler} onMouseUp={props.onMouseUpDragHandler}  width="70" height="70"/> 
    )
}

export const ContBlockWithSingleOutputEndPoints : IEndPointBrief[] = [
    { coords : {x: 70, y: 35}, inputOnly: false, arrowDirection: Direction.Right }
]

export const ContBlockWithSingleOutputSVG : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockFoundationSVG {...props} />
            <path className={styles.input_output} d="M 70,30 80,35 70,40"/>
        </>       
    )
}

export const ContBlockDoubleEndPoints : IEndPointBrief[] = [
    { coords : {x: 0, y: 15}, inputOnly : true},
    { coords: {x: 0, y: 55}, inputOnly : true },
    ...ContBlockWithSingleOutputEndPoints
]

export const ContBlockDoubleSVG : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockWithSingleOutputSVG {...props} />
            <path className={styles.input_output} d="M -10,10 0,15 -10,20"/>
            <path className={styles.input_output} d="M -10,50 0,55 -10,60"/>
        </>       
    )
}


export const ContBlockSingleEndPoints : IEndPointBrief[] = [
    {coords : {x: 0, y: 35}, inputOnly: true},
    ...ContBlockWithSingleOutputEndPoints,

]

export const ContBlockSingleSVG : FC<ContBlockProps> = (props) => {    
return (
        <>
            <ContBlockWithSingleOutputSVG {...props}/>
            <path className={styles.input_output}  d="M -10,30 0,35 -10,40"/>
        </>       
    )
}
