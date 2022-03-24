import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import { FC } from "react"
import { ObjectSVGProps } from "../Canvas"
import { ContBlockDoubleSVG } from "./ContBlocksSVG"

const circleDiameter = 5
const middleX = 35
const middleY = 35

export const DivSVG : FC<ObjectSVGProps> = (props) => {
    const dispatch = useAppDispatch();
    const useSelector = useAppSelector;

    return (
        <g>
            <ContBlockDoubleSVG {...props}/>
            <circle
                fill="#000000" fillOpacity="1" stroke="#000000" strokeWidth="0.199671" strokeMiterlimit="4" strokeDasharray="none" strokeOpacity="1"
                r={circleDiameter}
                cx={middleX}
                cy={middleY + 12} />
            <circle
                fill="#000000"  fillOpacity="1" stroke="#000000" strokeWidth="0.199671" strokeMiterlimit="4" strokeDasharray="none" strokeOpacity="1"
                r={circleDiameter}
                cx={middleX}
                cy={middleY - 12}
                />
            <rect
                fill="#000000" fillOpacity="1" stroke="#000000" strokeWidth="0.199671" strokeMiterlimit="4" strokeDasharray="none" strokeOpacity="1"
                width="30"
                height="8"
                x={middleX - 15}
                y={middleY - 4} />
    </g>
    )
}


