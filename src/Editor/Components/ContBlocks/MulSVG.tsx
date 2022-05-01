import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG, useAddSignal } from "./ContBlocksSVG"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { IMul } from "Editor/Model/ContBlocks/Mul"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"
import styles from "Editor/Styles/ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const MulSVG : FC<ObjectSVGProps> = (props) => {
    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IMul>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockDoubleEndPoints });
    const addSignal = useAddSignal(obj);


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text x={20} y={70} className={styles.text} fontSize={"70px"}>*</text>
            {mapEndPoints(addSignal)}
            <text className={styles.label} x={5} y={-15}>{obj.label}</text>
        </g>
    )
}