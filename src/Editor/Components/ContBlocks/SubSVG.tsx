import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG, useAddSignal } from "./ContBlocksSVG"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { ISub } from "Editor/Model/ContBlocks/Sub"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"
import styles from "Editor/Styles/ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35

/**
 * React komponenta pro blok odčítání
 * @param props 
 * @returns React komponenta bloku
 */
export const SubSVG : FC<ObjectSVGProps> = (props) => {
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
    = useSVGComponentUtils<ISub>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockDoubleEndPoints });

    const addSignal = useAddSignal(obj);

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
                {mapEndPoints(addSignal)}
                <text className={styles.label} x={5} y={-15}>{obj.label}</text>
        </g>
    )
}