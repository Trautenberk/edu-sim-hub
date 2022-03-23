import { FC } from "react"

export const ContBlockDouble : FC = () => {
    return (
        <>
            <rect fill="#ffffff" stroke="#000000" strokeMiterlimit="1" width="70" height="70"/>
            <path stroke="#000000" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M -10,10 0,15 -10,20"/>
            <path stroke="#000000" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"   d="M -10,50 0,55 -10,60"/>
            <path stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M 70,30 80,35 70,40"/>
        </>       
    )
}