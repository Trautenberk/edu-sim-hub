import { ObjectEditProps } from "Components/Editor/Canvas";
import { changeObject } from "Feature/SimObjectManagementSlice";
import { isPlace } from "Model/PetriNets/Place";
import React, { FC} from "react"
import { useAppDispatch, useAppSelector } from "Store/Hooks"

export const PlaceEdit : FC<ObjectEditProps>  = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const obj = {...useSelector(state => state.simObjectManagement.objects[props.id])}

    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(isPlace(obj)){
            obj.label = e.currentTarget.value;
            dispatch(changeObject(obj))
        } else {
            console.error("Object is not type of Place");
        }
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <label>Nadpis </label>
                <input onChange={onLabelInputChange}></input>
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