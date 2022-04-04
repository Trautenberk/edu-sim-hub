import { ObjectEditProps } from "App";
import { changeObject } from "Editor/Feature/SimObjectManagementSlice";
import { IPlace  } from "Editor/Model/PetriNets/Place";
import React, { FC} from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks"
import style from "./PlaceStyle.module.scss"
import { useEditComponentUtils } from "../Utilities/CustomHooks/useEditComponentUtils";

export const PlaceEdit : FC<ObjectEditProps>  = (props) => {
    const { obj, dispatchChange} = useEditComponentUtils<IPlace>(props.id);

    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatchChange(obj)
    }

    const incrementCallback = () => {
        obj.tokenCount++;
        dispatchChange(obj)    }

    const decrementCallback = () => {
        if (obj.tokenCount > 0) {
            obj.tokenCount--;
            dispatchChange(obj) 
        }
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <div>
                    <label>Nadpis: </label>
                    <input value={obj.label} type="text" onChange={onLabelInputChange}></input>        
                </div>
                <div>
                    <label>Tokeny:</label>
                    <input readOnly value={obj.tokenCount}></input>
                    <button onClick={incrementCallback} className={style.edit_button}>+</button>
                    <button onClick={decrementCallback} className={style.edit_button}>-</button> 
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
