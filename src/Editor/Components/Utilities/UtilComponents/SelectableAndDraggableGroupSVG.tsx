import { ICoordinates } from "Editor/Model/UtilClasses/Coordinates"
import { FC } from "react"
import { useSelectable } from "../CustomHooks/useSelectable"
import  { DraggableRefGroupSVG } from "."

type SelectableAndDraggableGroupSVGProps = {
    refObj : SVGElement | null,
    coords : ICoordinates,      // počáteční souřadnice
    id : string
}

export const SelectableAndDraggableGroupSVG : FC<SelectableAndDraggableGroupSVGProps> = (props) => {
    
    const { onMouseDown } = useSelectable(props.id)

    return (
        <DraggableRefGroupSVG {...props} onMouseDown={onMouseDown} >
            {props.children}
        </DraggableRefGroupSVG>
    )
}