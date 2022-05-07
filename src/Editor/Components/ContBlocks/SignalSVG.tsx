import { selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { ISignal } from "Editor/Model/ContBlocks/Signal";
import { FC } from "react"
import { useStoreHooks } from "../Utilities/CustomHooks";
import { EdgeSVG } from "../Utilities/UtilComponents"
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";


/**
 * React komponenta hrany signálu
 * @param props 
 * @returns React komponenta bloku
 */
export const SignalSVG : FC<EdgeSVGComponentProps> = (props) => {

    const { useSelector } = useStoreHooks();
    const obj = useSelector(state => selectObj(state, props.id)) as ISignal;

    return(
        <EdgeSVG id={props.id} />
    )
}