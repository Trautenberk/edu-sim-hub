import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG, useAddSignal } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { ISub } from "Editor/Model/ContBlocks/Sub"


const middleX = 35
const middleY = 35

export const SubSVG : FC<ObjectSVGProps> = (props) => {
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
    = useSVGComponentUtils<ISub>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockDoubleEndPoints });

    const addSignal =   useAddSignal(obj);

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
                {mapEndPoints(addSignal)}
        </g>
    )
}