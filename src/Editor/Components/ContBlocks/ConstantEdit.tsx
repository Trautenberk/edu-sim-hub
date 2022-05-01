import { ObjectEditProps } from "App";
import React, { FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";
import { IConstant } from "Editor/Model/ContBlocks/Constant";

export const ConstantEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IConstant>(props.id);

    const onValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.value = parseFloat(e.target.value);
        dispatchChange(obj)
    }

    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatchChange(obj)
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Štítek:</label>
                    <input value={obj.label} type="text" onChange={onLabelInputChange}></input>        
                </div>
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