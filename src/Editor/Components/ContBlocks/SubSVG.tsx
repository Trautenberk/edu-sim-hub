import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"
import styles from "./ContBlockStyles.module.scss"


const middleX = 35
const middleY = 35

export const SubSVG : FC<ObjectSVGProps> = (props) => {

    return (
        <>
            <ContBlockDoubleSVG {...props}/>
            <rect
                className={styles.sign}
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
        </>
    )
}