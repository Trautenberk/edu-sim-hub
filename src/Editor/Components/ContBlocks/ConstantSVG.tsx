import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockWithSingleOutputSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const ConstantSVG : FC<ObjectSVGProps> = (props) => {

    const value = 0;

    return (
        <>
            <ContBlockWithSingleOutputSVG {...props}/>
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </>
    )
}