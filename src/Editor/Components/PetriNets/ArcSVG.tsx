import { selectObj } from "Editor/Feature/SimObjectManagementSlice";
import { IArc } from "Editor/Model/PetriNets";
import { FC } from "react"
import { useStoreHooks } from "../Utilities/CustomHooks";
import { EdgeSVG } from "../Utilities/UtilComponents"
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";


/**
 * React komponenta hrany Petriho sítě. 
 * Slouží pro zobrazení vstupní i výstupní hrany.
 * @param props 
 * @returns React komponenta editačního okna
 */
export const ArcSVG : FC<EdgeSVGComponentProps> = (props) => {
    const { useSelector } = useStoreHooks();
    const obj = useSelector(state => selectObj(state, props.id)) as IArc ;

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