import { FC, useRef } from "react"
import { ObjectSVGProps } from "../Canvas"
import { useDragRef, useSelectable } from "../Utilities"
import { DraggableRefGroupSVG, SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const AddSVG : FC<ObjectSVGProps> = (props) => {
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

                <rect
                className={styles.sign}
                width="8"
                height="30"
                x={middleX - 4}
                y={middleY - 15} />
        </SelectableAndDraggableGroupSVG>
            
    )
}