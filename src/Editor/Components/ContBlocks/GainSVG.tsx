import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { useDragRef } from "../Utilities"
import { SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents"
import { ContBlockSingleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35
export const GainSVG : FC<ObjectSVGProps> = (props) => {

    const value = 0;
    const {dragRef, setRef} = useDragRef()


    return (
        <SelectableAndDraggableGroupSVG id={props.id} refObj={dragRef} coords={props.groupAbsoluteCoordinates} >
            <ContBlockSingleSVG {...props} setRef={setRef}/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </SelectableAndDraggableGroupSVG>
    )
}