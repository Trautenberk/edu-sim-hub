import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35

export const MulSVG : FC<ObjectSVGProps> = (props) => {


    return (
        <g>
            {/* <ContBlockDoubleSVG {...props} setRef={setRef}/> */}
            <text x={20} y={70} fontSize={"70px"}>*</text>
        </g>
    )
}