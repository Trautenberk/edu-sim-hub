import { ObjectSVGProps } from "App"
import { FC, useRef } from "react"
import {  useSelectable } from "../Utilities"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const middleX = 35
const middleY = 35

export const AddSVG : FC<ObjectSVGProps> = (props) => {
    const coordinates = { x: 0, y: 0};
    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 
            {/* <ContBlockDoubleSVG {...props} /> */}
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />

                <rect
                className={styles.sign}
                width="8"
                height="30"
                x={middleX - 4}
                y={middleY - 15} />
        </g>
            
    )
}