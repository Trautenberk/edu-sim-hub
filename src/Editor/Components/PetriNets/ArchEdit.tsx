
import { ObjectEditProps } from "App";
import { IArch } from "Editor/Model/PetriNets";
import { FC } from "react";
import { useEditComponentUtils } from "../Utilities/CustomHooks";
import style from "./TransitionStyle.module.scss"


export const ArchEdit : FC<ObjectEditProps> = (props) => {

    const { obj, dispatchChange } = useEditComponentUtils<IArch>(props.id);

    const onWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        obj.weight = parseInt(e.target.value);
        dispatchChange(obj);
    }

    const incrementWeight = () => {
        obj.weight++;
        dispatchChange(obj);
    }

    const decrementWeight = () => {
        obj.weight--;
        dispatchChange(obj);
    }

    if (obj != null) {
        return (
            <div>
                <p> Je vybrán element {props.id} </p>
                <label>Váha:</label>
                    <input onChange={onWeightInputChange} type="number" min="0" value={obj.weight}></input>
                    <button onClick={incrementWeight} className={style.edit_button}>+</button>
                    <button onClick={decrementWeight} className={style.edit_button}>-</button>
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