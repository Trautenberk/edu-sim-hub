import { FC } from "react"
import { ObjectSVGProps } from "App"
import { IIntegrator } from "Editor/Model/ContBlocks/Integrator";
import { useSVGComponentUtils } from "../Utilities/CustomHooks";
import { ContBlockSingleEndPoints, ContBlockSingleSVG } from "./ContBlocksSVG";

const middleX = 35
const middleY = 35

export const IntegratorSVG : FC<ObjectSVGProps> = (props) => {

    const {
        coordinates,
        onMouseDownHandler,
        onMouseUpHandler,
        selectedVisible,
        obj,
        mapEndPoints
    } 
    = useSVGComponentUtils<IIntegrator>({id: props.id, initialCoordinates: {x: 30, y: 30}, endPointsBrief: ContBlockSingleEndPoints });

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            <ContBlockSingleSVG onMouseDownDragHandler={onMouseDownHandler} onMouseUpDragHandler={onMouseUpHandler} selectedVisible={selectedVisible} />
            <g transform={`translate(20 60) scale(0.05 0.05)`}>
                <path  xmlns="http://www.w3.org/2000/svg" id="path3106" d="m 166,-1111 c -54,0 -111,30 -111,85 0,27 21,41 42,41 21,0 42,-14 42,-41 0,-26 -19,-40 -38,-42 16,-13 39,-21 65,-21 78,0 97,100 97,207 v 653 c 0,116 68,229 180,229 54,0 111,-30 111,-85 0,-28 -21,-41 -42,-41 -21,0 -42,13 -42,41 0,26 19,40 38,42 -16,13 -39,21 -65,21 -78,0 -97,-101 -97,-207 v -653 c 0,-116 -68,-229 -180,-229 z" fill={"currentColor"}/>
            </g>

            {mapEndPoints()}
        </g>
    )
}

