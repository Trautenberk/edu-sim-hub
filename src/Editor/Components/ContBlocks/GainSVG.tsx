import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockSingleEndPoints, ContBlockSingleSVG, useAddSignal } from "./ContBlocksSVG"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { IGain } from "Editor/Model/ContBlocks/Gain"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"
import styles from "Editor/Styles/ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35

/**
 * React komponenta pro blok zesilovače
 * @param props 
 * @returns React komponenta bloku
 */
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
    = useSVGComponentUtils<IGain>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockSingleEndPoints });
    const addSignal = useAddSignal(obj);


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockSingleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text className={styles.text} fontSize={20} x={middleX - 20} y={middleY}>*{obj.gain.toFixed(1)}</text>
            {mapEndPoints(addSignal)}
            <text className={styles.label} x={5} y={-15}>{obj.label}</text>
        </g>
    )
}