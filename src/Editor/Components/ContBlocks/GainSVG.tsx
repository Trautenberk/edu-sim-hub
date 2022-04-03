import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockSingleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35
export const GainSVG : FC<ObjectSVGProps> = (props) => {

    const value = 0;


    return (
        <g> 
            {/* <ContBlockSingleSVG {...props} setRef={setRef}/> */}
            <text fontSize={20} x={middleX} y={middleY}>{value}</text>
        </g>
    )
}