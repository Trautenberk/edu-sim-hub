
import { ObjectEditProps } from "App";
import { IArc } from "Editor/Model/PetriNets";
import { FC } from "react";
import { useEditComponentUtils } from "../Utilities/CustomHooks";
import styles from "Editor/Styles/PetriNetsStyles.module.scss";

/**
 * React komponenta pro editaci atributů hrany 
 * @param props 
 * @returns React komponenta editačního okna
 */
export const ArcEdit : FC<ObjectEditProps> = (props) => {

    const { obj, dispatchChange } = useEditComponentUtils<IArc>(props.id);

    /**
     * Handler input elementu váhy hrany 
     */
    const onWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        obj.weight = parseInt(e.target.value);
        dispatchChange(obj);
    }


    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <label>Váha:</label>
                    <input onChange={onWeightInputChange} type="number" min="0" value={obj.weight}></input>
            </div>
        )
    } else {
        console.error(`Couldnt find obj with id ${props.id}`)
        return (
            <>
            </>
        )
    }
}