import  React, { FC, useRef } from "react"
import { Coordinates, DraggableHandlers } from "Editor/Components/Utilities"
import { EndPointSVG } from "Editor/Components/Utilities/UtilComponents"
import { Direction } from "../Utilities/UtilMethodsAndTypes"
import { GroupPoint } from "../../Model/UtilClasses/Point"
import { ObjectSVGProps } from "App"
import { ICoordinates } from "../../Model/UtilClasses/Coordinates"
import styles from "./ContBlockStyles.module.scss"

type DragElementRef = {
    coords: ICoordinates
}

type ContBlockProps  = ObjectSVGProps & DragElementRef;

export const ContBlockFoundationSVG : FC<ContBlockProps> = (props) => {    
    return (
            <rect className={styles.foundation}  width="70" height="70"/> 
    )
}

export const ContBlockWithSingleOutputSVG : FC<ContBlockProps> = (props) => {

    const outputEndPointCoords : ICoordinates = {x: 70, y: 35};

    const point = new GroupPoint({id: `${props.id}_1`, groupCoords: outputEndPointCoords, coords: new Coordinates(props.coords).add(outputEndPointCoords)});

    return (
        <>
            <ContBlockFoundationSVG {...props} />
            <path className={styles.input_output} d="M 70,30 80,35 70,40"/>
            {/* <EndPointSVG parentElementID={props.id} point={point} arrowDirection={Direction.Right}/> */}
        </>       
    )
}

export const ContBlockDoubleSVG : FC<ContBlockProps> = (props) => {
    const inputOneEndPointCoords : ICoordinates = {x: 0, y: 15};
    const inputTwoEndPointCoords : ICoordinates = {x: 0, y: 55};


    const inputOnePoint = new GroupPoint({id: `${props.id}_2`, groupCoords: inputOneEndPointCoords, coords: new Coordinates(props.coords).add(inputOneEndPointCoords)});
    const inputTwoPoint = new GroupPoint({id: `${props.id}_3`, groupCoords: inputTwoEndPointCoords, coords: new Coordinates(props.coords).add(inputTwoEndPointCoords)});

    return (
        <>
            <ContBlockWithSingleOutputSVG {...props} />
            <path className={styles.input_output} d="M -10,10 0,15 -10,20"/>
            <path className={styles.input_output} d="M -10,50 0,55 -10,60"/>
            {/* <EndPointSVG parentElementID={props.id} point={inputOnePoint} arrowDirection={Direction.Left}/> */}
            {/* <EndPointSVG parentElementID={props.id} point={inputTwoPoint} arrowDirection={Direction.Left}/> */}
        </>       
    )
}

export const ContBlockSingleSVG : FC<ContBlockProps> = (props) => {
    
    const inputOneEndPointCoords : ICoordinates = {x: 0, y: 35};
    const inputOnePoint = new GroupPoint({id: `${props.id}_2`, groupCoords: inputOneEndPointCoords, coords: new Coordinates(props.coords).add(inputOneEndPointCoords)});
    
    return (
        <>
            <ContBlockWithSingleOutputSVG {...props}/>
            <path className={styles.input_output}  d="M -10,30 0,35 -10,40"/>
            {/* <EndPointSVG parentElementID={props.id} point={inputOnePoint} arrowDirection={Direction.Left}/> */}
        </>       
    )
}
