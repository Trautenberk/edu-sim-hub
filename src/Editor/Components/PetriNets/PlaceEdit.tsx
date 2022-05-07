import { ObjectEditProps } from "App";
import { IPlace  } from "Editor/Model/PetriNets/Place";
import React, { FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";

/**
 * React komponenta pro editaci atributů místa PN.
 * @param props 
 * @returns React komponenta editačního okna
 */
export const PlaceEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IPlace>(props.id);

    /**
     * Handler input elementu návěští
     */
    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatchChange(obj)
    }

    /**
     * Handler input elementu počtu tokenů v místě
     */
    const onTokensChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.tokenCount = parseInt(e.target.value);
        dispatchChange(obj)
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Štítek: </label>
                    <input value={obj.label} type="text" onChange={onLabelInputChange}></input>        
                </div>
                <div>
                    <label>Tokeny:</label>
                    <input type="number" min="0" max="999" value={obj.tokenCount} onChange={onTokensChange}></input>
                </div>
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
