import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockWithSingleOutputEndPoints, ContBlockWithSingleOutputSVG, useAddSignal } from "./ContBlocksSVG"
import { IConstant } from "Editor/Model/ContBlocks/Constant"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"
import styles from "Editor/Styles/ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const TimeSVG : FC<ObjectSVGProps> = (props) => {

    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IConstant>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockWithSingleOutputEndPoints });

    const addSignal = useAddSignal(obj);


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockWithSingleOutputSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text className={styles.text} fontSize={40} x={middleX - 12} y={middleY + 10}>{"T"}</text>
            {mapEndPoints(addSignal)}
            <text className={styles.label} x={5} y={-15}>{obj.label}</text>
        </g>
    )
}