import { ObjectEditProps } from "Editor/Components/Canvas";
import { changeObject } from "Editor/Feature/SimObjectManagementSlice";
import { IPlace, isPlace } from "Editor/Model/PetriNets/Place";
import React, { FC} from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks"
import style from "Editor/Styles/PetriNets/PlaceStyle.module.scss"

export const PlaceEdit : FC<ObjectEditProps>  = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const obj = {...useSelector(state => state.simObjectManagement.objects[props.id])} as IPlace // TODO odstranit pretypovani

    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(isPlace(obj)){
            obj.label = e.currentTarget.value;
            dispatch(changeObject(obj))
        } else {
            console.error("Object is not type of Place");
        }
    }

    const incrementCallback = () => {
        obj.tokenCount++;
        dispatch(changeObject(obj))        
    }

    const decrementCallback = () => {
        if (obj.tokenCount > 0) {
            obj.tokenCount--;
            dispatch(changeObject(obj))        
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