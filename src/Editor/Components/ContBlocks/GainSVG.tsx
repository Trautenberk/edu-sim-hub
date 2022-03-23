import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockSingle } from "./ContBlocks"

const middleX = 35
const middleY = 35
export const GainSVG : FC<ObjectSVGProps> = () => {

    const value = 0;

    return (
        <>
            <ContBlockSingle/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </>
    )
}