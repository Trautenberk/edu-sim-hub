import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleEndPoints, ContBlockDoubleSVG, useAddSignal } from "./ContBlocksSVG"
import { useSVGComponentUtils } from "../Utilities/CustomHooks"
import { IMul } from "Editor/Model/ContBlocks/Mul"
import { INITIAL_COORDINATES } from "../Utilities/UtilMethodsAndTypes"


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
    = useSVGComponentUtils<IMul>({id: props.id, initialCoordinates: INITIAL_COORDINATES, endPointsBrief: ContBlockDoubleEndPoints });
    const addSignal = useAddSignal(obj);


    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockDoubleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <text x={20} y={70} fontSize={"70px"}>*</text>
            {mapEndPoints(addSignal)}
        </g>
    )
}