import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { IMul } from "Editor/Model/ContBlocks/Mul"


const middleX = 35
const middleY = 35

export const MulSVG : FC<ObjectSVGProps> = (props) => {

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
    = useSVGComponentUtils<IMul>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockDoubleEndPoints });


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text x={20} y={70} fontSize={"70px"}>*</text>
            {mapEndPoints()}
        </g>
    )
}