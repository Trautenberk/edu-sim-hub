import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"
import { useSVGComponentUtils } from "../Utilities/CustomHooks";
import { IDiv } from "Editor/Model/ContBlocks/Div";

const circleDiameter = 5
const middleX = 35
const middleY = 35

export const DivSVG : FC<ObjectSVGProps> = (props) => {
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
    = useSVGComponentUtils<IDiv>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockDoubleEndPoints });

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
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
            {mapEndPoints()}
        </g>
    )
}


