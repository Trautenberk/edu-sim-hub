import { FC, useCallback } from "react"
import { DraggableHandlers } from "Editor/Components/Utilities"
import { EndPoint } from "Editor/Components/Utilities/UtilComponents"
import { Direction } from "../Utilities/UtilMethodsAndTypes"
import { GroupPoint } from "../Utilities/UtilClasses/Point"
import { ObjectSVGProps } from "../Canvas"
import { useAppDispatch } from "Editor/Store/Hooks"
import { elementClicked } from "Editor/Feature/PointEdgeSelectionSlice"
import { useSelectable } from "Editor/Components/Utilities"
type ContBlockProps = ObjectSVGProps;

export const ContBlockFoundation : FC<ContBlockProps> = (props) => {    
    const dispatch = useAppDispatch();

    const {onMouseDown} = useSelectable(props.id, props.onMouseDownDragHandler)

    return (
        <>
            <rect onMouseDown={onMouseDown} onMouseUp={props.onMouseUpDragHandler} fill="#ffffff" stroke="#000000" strokeMiterlimit="1" width="70" height="70"/>
        </>       
    )
}

export const ContBlockWithSingleOutput : FC<ContBlockProps> = (props) => {

    const point = new GroupPoint({id: props.id, coords: props.groupAbsoluteCoordinates,groupCoords: props.groupAbsoluteCoordinates});

    return (
        <>
            <ContBlockFoundation {...props} />
            <path stroke="#000000" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="4"  d="M 70,30 80,35 70,40"/>
            <EndPoint parentElementID={props.id} point={point} arrowDirection={Direction.Right}/>
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
