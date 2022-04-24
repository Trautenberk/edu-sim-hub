import { selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { IArch } from "Editor/Model/PetriNets";
import { FC } from "react"
import { useStoreHooks } from "../Utilities/CustomHooks";
import { EdgeSVG } from "../Utilities/UtilComponents"
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";


export const ArchSVG : FC<EdgeSVGComponentProps> = (props) => {
    const { useSelector } = useStoreHooks();
    const obj = useSelector(state => selectObj(state, props.id)) as IArch;

    if (obj.weight == 1) {
        return(
            <EdgeSVG id={props.id} />
        )
    } else {
        return(
            <EdgeSVG id={props.id} value={obj.weight} />
        )    
    }
}