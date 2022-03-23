import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockDouble } from "./ContBlocks"


const middleX = 35
const middleY = 35


export const AddSVG : FC<ObjectSVGProps> = () => {

    return (
        <>
            <ContBlockDouble/>
            <rect
                fill="#000000" fillOpacity="1" stroke="#000000" strokeWidth="0.199671" strokeMiterlimit="4" strokeDasharray="none" strokeOpacity="1"
                width="30"
                height="8"
                x={middleX}
                y={middleY} />

                <rect
                fill="#000000" fillOpacity="1" stroke="#000000" strokeWidth="0.199671" strokeMiterlimit="4" strokeDasharray="none" strokeOpacity="1"
                width="8"
                height="30"
                x={middleX}
                y={middleY - 4} />
            </>
            
    )
}