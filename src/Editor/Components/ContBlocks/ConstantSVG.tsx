import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockWithSingleOutput } from "./ContBlocks"

const middleX = 35
const middleY = 35

export const ConstantSVG : FC<ObjectSVGProps> = () => {

    const value = 0;

    return (
        <>
            <ContBlockWithSingleOutput/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </>
    )
}