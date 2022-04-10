import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockWithSingleOutputEndPoints, ContBlockWithSingleOutputSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"
import { IConstant } from "Editor/Model/ContBlocks/Constant"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"

const middleX = 35
const middleY = 35

export const ConstantSVG : FC<ObjectSVGProps> = (props) => {

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
    = useSVGComponentUtils<IConstant>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockWithSingleOutputEndPoints });

    const value = 0;

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockWithSingleOutputSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
            {mapEndPoints()}
        </g>
    )
}