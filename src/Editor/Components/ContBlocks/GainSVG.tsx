import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockSingleEndPoints, ContBlockSingleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { IGain } from "Editor/Model/ContBlocks/Gain"


const middleX = 35
const middleY = 35
export const GainSVG : FC<ObjectSVGProps> = (props) => {

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
    = useSVGComponentUtils<IGain>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockSingleEndPoints });


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockSingleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text fontSize={20} x={middleX - 15} y={middleY}>{obj.gain.toFixed(2)}</text>
            {mapEndPoints()}
        </g>
    )
}