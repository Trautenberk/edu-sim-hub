import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockWithSingleOutputEndPoints, ContBlockWithSingleOutputSVG, useAddSignal } from "./ContBlocksSVG"
import { IConstant } from "Editor/Model/ContBlocks/Constant"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"

const middleX = 35
const middleY = 35

export const ConstantSVG : FC<ObjectSVGProps> = (props) => {

    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IConstant>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockWithSingleOutputEndPoints });

    const addSignal = useAddSignal(obj);


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockWithSingleOutputSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text fontSize={20} x={middleX} y={middleY}>{obj.value}</text>
            {mapEndPoints(addSignal)}
        </g>
    )
}