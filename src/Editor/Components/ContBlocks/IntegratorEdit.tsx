import { ObjectEditProps } from "App";
import React, { FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";
import { IConstant } from "Editor/Model/ContBlocks/Constant";
import { IIntegrator } from "Editor/Model/ContBlocks/Integrator";

export const IntegratorEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IIntegrator>(props.id);

    const onValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.initialValue = parseFloat(e.target.value);
        dispatchChange(obj)
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Počáteční hodnota:</label>
                    <input type="number" value={obj.initialValue} onChange={onValueChange}></input>
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