import { FC } from "react"
import { DraggableHandlers } from "Editor/Components/Utilities"

type ContBlockProps = DraggableHandlers & {}

export const ContBlockFoundation : FC<ContBlockProps> = (props) => {
    return (
        <>
            <rect onMouseDown={props.onMouseDownDragHandler} onMouseUp={props.onMouseUpDragHandler} fill="#ffffff" stroke="#000000" strokeMiterlimit="1" width="70" height="70"/>
        </>       
    )
}

export const ContBlockWithSingleOutput : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockFoundation {...props} />
            <path stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M 70,30 80,35 70,40"/>
        </>       
    )
}

export const ContBlockDouble : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockWithSingleOutput {...props} />
            <path stroke="#000000" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M -10,10 0,15 -10,20"/>
            <path stroke="#000000" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"   d="M -10,50 0,55 -10,60"/>
        </>       
    )
}

export const ContBlockSingle : FC<ContBlockProps> = (props) => {
    return (
        <>
            <ContBlockWithSingleOutput {...props}/>
            <path stroke="#000000" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M -10,30 0,35 -10,40"/>
        </>       
    )
}
