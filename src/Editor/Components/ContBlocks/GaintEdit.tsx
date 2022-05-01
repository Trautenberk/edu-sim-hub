import { ObjectEditProps } from "App";
import React, { FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";
import { IGain } from "Editor/Model/ContBlocks/Gain";

export const GainEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IGain>(props.id);

    const onValueChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.gain = parseFloat(e.target.value);
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
                    <label>Hodnota zaslení::</label>
                    <input type="number" value={obj.gain} onChange={onValueChange}></input>
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