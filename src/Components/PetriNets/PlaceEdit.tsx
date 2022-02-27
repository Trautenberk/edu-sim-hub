import { ObjectEditProps } from "Components/Editor/Canvas";
import { changeObject } from "Feature/SimObjectManagementSlice";
import { IPlace, isPlace } from "Model/PetriNets/Place";
import React, { FC} from "react"
import { useAppDispatch, useAppSelector } from "Store/Hooks"
import style from "Styles/PetriNets/PlaceStyle.module.scss"

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
        obj.processCount++;
        dispatch(changeObject(obj))        
    }

    const decrementCallback = () => {
        if (obj.processCount > 0) {
            obj.processCount--;
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
                    <input readOnly value={obj.processCount}></input>
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