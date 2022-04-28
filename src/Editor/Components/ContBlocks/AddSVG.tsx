import { ObjectSVGProps } from "App"
import { addEdgeObject } from "Editor/Feature/SimObjectManagementSlice"
import { IAdd } from "Editor/Model/ContBlocks/Add"
import { FC } from "react"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG, useAddSignal } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const AddSVG : FC<ObjectSVGProps> = (props) => {
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
    = useSVGComponentUtils<IAdd>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockDoubleEndPoints });

    const addSignal = useAddSignal(obj);

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            {mapEndPoints(addSignal)}
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
        </g>
            
    )
}

