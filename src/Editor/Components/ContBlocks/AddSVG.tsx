import { ObjectSVGProps } from "App"
import { IAdd } from "Editor/Model/ContBlocks/Add"
import { ICoordinates } from "Editor/Model/UtilClasses/Coordinates"
import { FC, useRef } from "react"
import {  useSelectable } from "../Utilities"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { EndPointSVG } from "../Utilities/UtilComponents"
import { ALL_DIRECTIONS, Direction } from "../Utilities/UtilMethodsAndTypes"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const AddSVG : FC<ObjectSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        dispatch,
        selectedVisible,
        obj,
        endPoints,
        mapEndPoints
    } 
    = useSVGComponentUtils<IAdd>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockDoubleEndPoints });

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            {mapEndPoints()}
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />

                <rect
                className={styles.sign}
                width="8"
                height="30"
                x={middleX - 4}
                y={middleY - 15} />
        </g>
            
    )
}