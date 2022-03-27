import { FC } from "react"
import { EdgeSVG } from "../Utilities/UtilComponents"
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";


export const ArchSVG : FC<EdgeSVGComponentProps> = (props) => {

    const weight = 0;

    return(
        <EdgeSVG id={props.id}/>
    )
}