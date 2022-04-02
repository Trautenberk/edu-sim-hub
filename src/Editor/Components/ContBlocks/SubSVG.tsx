import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { useDragRef } from "../Utilities"
import { SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35

export const SubSVG : FC<ObjectSVGProps> = (props) => {
    const {dragRef, setRef} = useDragRef()

    return (
        <SelectableAndDraggableGroupSVG id={props.id} refObj={dragRef} coords={props.groupAbsoluteCoordinates} >
            <ContBlockDoubleSVG {...props} setRef={setRef} />
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
        </SelectableAndDraggableGroupSVG>
    )
}