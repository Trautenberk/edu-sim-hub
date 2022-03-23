import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockDouble } from "./ContBlocks"


const middleX = 35
const middleY = 35

export const MulSVG : FC<ObjectSVGProps> = () => {

    return (
        <>
            <ContBlockDouble/>
            <text x={20} y={70} fontSize={"70px"}>*</text>
        </>
    )
}