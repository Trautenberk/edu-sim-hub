import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { useDragRef } from "../Utilities";
import { SelectableAndDraggableGroupSVG } from "../Utilities/UtilComponents";
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const circleDiameter = 5
const middleX = 35
const middleY = 35

export const DivSVG : FC<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;
    const {dragRef, setRef} = useDragRef()


    return (
        <SelectableAndDraggableGroupSVG id={props.id} refObj={dragRef} coords={props.groupAbsoluteCoordinates} >
            <ContBlockDoubleSVG {...props} setRef={setRef}/>
            <circle
                className={styles.sign}
                r={circleDiameter}
                cx={middleX}
                cy={middleY + 12} />
            <circle
                className={styles.sign}
                r={circleDiameter}
                cx={middleX}
                cy={middleY - 12}
                />
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
        </SelectableAndDraggableGroupSVG>
    )
}


