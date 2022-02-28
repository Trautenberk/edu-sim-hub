import { ObjectEditProps } from "Components/Editor/Canvas"
import { changeObject } from "Feature/SimObjectManagementSlice";
import { ITransition, TransitionType } from "Model/PetriNets/Transition";
import React, {FC} from "react"
import { useAppDispatch, useAppSelector } from "Store/Hooks";
import style from "Styles/PetriNets/TransitionStyle.module.scss"

export const TransitionEdit : FC<ObjectEditProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const obj = {...useSelector(state => state.simObjectManagement.objects[props.id])} as ITransition // TODO odstranit pretypovani
 
    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatch(changeObject(obj))
    }

    const incrementPriority = () => {
        obj.priority++;
        dispatch(changeObject(obj))        
    }

    const decrementPriority = () => {
        if (obj.priority > 0) {
            obj.priority--;
            dispatch(changeObject(obj))        
        }
    }

    const incrementProbability = () => {
        if (obj.probability < 100) {
            obj.probability++;
            dispatch(changeObject(obj));
        }
    }

    const decrementProbability = () => {
        if (obj.probability > 0) {
            obj.probability--;
            dispatch(changeObject(obj));
        }
    }

    const onSelectChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        obj.type = e.target.value as TransitionType;
        dispatch(changeObject(obj));
    }

    const incrementTimeValue = () => {
        obj.timeValue++;
        dispatch(changeObject(obj));
    }

    const decrementTimeValue = () => {
        if (obj.timeValue > 0) {
            obj.timeValue--;
            dispatch(changeObject(obj));
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
                    <label>Typ přechodu:</label>
                    <select onChange={onSelectChange} value={obj.type}>
                        <option value={TransitionType.Priority}>{TransitionType.Priority}</option>
                        <option value={TransitionType.Timed}>{TransitionType.Timed}</option>
                        <option value={TransitionType.Probability}>{TransitionType.Probability}</option>
                    </select>
                </div>
                {obj.type === TransitionType.Priority &&
                    <div>
                    <label>Priorita:</label> 
                    <input readOnly value={obj.priority}></input>
                    <button onClick={incrementPriority} className={style.edit_button}>+</button>
                    <button onClick={decrementPriority} className={style.edit_button}>-</button>
                </div>}

                {obj.type === TransitionType.Probability &&
                <div>
                    <label>Pravděpodobnost:</label>
                    <input readOnly value={obj.probability}></input>
                    <button onClick={incrementProbability} className={style.edit_button}>+</button>
                    <button onClick={decrementProbability} className={style.edit_button}>-</button>
                </div>}

                {obj.type === TransitionType.Timed && 
                <div>
                    <label>Typ časování:</label>
                    <select>
                    </select>
                    <label>Hodnota:</label>
                    <input readOnly value={obj.priority}></input>
                    <button onClick={incrementTimeValue} className={style.edit_button}>+</button>
                    <button onClick={decrementTimeValue} className={style.edit_button}>-</button>
                </div>}
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