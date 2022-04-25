import { ObjectEditProps } from "App";
import React, { FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";
import { IConstant } from "Editor/Model/ContBlocks/Constant";

export const ConstantEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IConstant>(props.id);

    const onValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.value = parseInt(e.target.value);
        dispatchChange(obj)
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Hodnota konstanty:</label>
                    <input type="number" value={obj.value} onChange={onValueChange}></input>
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