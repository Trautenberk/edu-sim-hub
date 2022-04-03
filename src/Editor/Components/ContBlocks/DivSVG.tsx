import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { FC } from "react"
import { ObjectSVGProps } from "App"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"

const circleDiameter = 5
const middleX = 35
const middleY = 35

export const DivSVG : FC<ObjectSVGProps> = (props) => {


    const coordinates = { x : 0, y : 0}

    return (
        <g transform={`translate(${coordinates.x},${coordinates.y})`}> 

            {/* <ContBlockDoubleSVG {...props} /> */}
            <circle
                className={styles.sign}
                r={circleDiameter}
                cx={middleX}
                cy={middleY + 12} />
            <circle
                className={styles.sign}
                r={circleDiameter}
                cx={middleX}
                cy={middleY - 12}
                />
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
        </g>
    )
}


