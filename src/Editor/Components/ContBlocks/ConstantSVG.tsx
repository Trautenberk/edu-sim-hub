import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { useDragRef } from "../Utilities"
import { SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents"
import { ContBlockWithSingleOutputSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const ConstantSVG : FC<ObjectSVGProps> = (props) => {
    const {dragRef, setRef} = useDragRef()

    const value = 0;

    return (
        <SelectableAndDraggableGroupSVG id={props.id} refObj={dragRef} coords={props.groupAbsoluteCoordinates} >
            <ContBlockWithSingleOutputSVG {...props} setRef={setRef}/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </SelectableAndDraggableGroupSVG>
    )
}