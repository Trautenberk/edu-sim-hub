import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockSingle } from "./ContBlocks"

const middleX = 35
const middleY = 35
export const GainSVG : FC<ObjectSVGProps> = (props) => {

    const value = 0;

    return (
        <>
            <ContBlockSingle {...props}/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </>
    )
}