import { ObjectEditProps } from "Editor/Components/Canvas"
import { changeObject } from "Editor/Feature/SimObjectManagementSlice";
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import React, {FC} from "react"
import { useAppDispatch, useAppSelector } from "Editor/Store/Hooks";
import style from "Editor/Styles/PetriNets/TransitionStyle.module.scss"

export const TransitionEdit : FC<ObjectEditProps> = (props) => {
    const useSelector = useAppSelector;
    const dispatch = useAppDispatch();

    const obj = {...useSelector(state => state.simObjectManagement.objects[props.id])} as ITransition // TODO odstranit pretypovani
 
    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatch(changeObject(obj))
    }

    const onPriorityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.priority = parseInt(e.target.value);
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

    const onProbabilityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.probability = parseInt(e.target.value); //TODO pouzit něco jineho než parseInt
        dispatch(changeObject(obj));
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

    const onTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        obj.timeValue = parseInt(e.target.value);
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
                    <input onChange={onPriorityChange} type="number" min="0" value={obj.priority}></input>
                    <button onClick={incrementPriority} className={style.edit_button}>+</button>
                    <button onClick={decrementPriority} className={style.edit_button}>-</button>
                </div>}

                {obj.type === TransitionType.Probability &&
                <div>
                    <label>Pravděpodobnost:</label>
                    <input onChange={onProbabilityChange} type="number" min="0" max="100" value={obj.probability}></input>
                    <button onClick={incrementProbability} className={style.edit_button}>+</button>
                    <button onClick={decrementProbability} className={style.edit_button}>-</button>
                </div>}

                {obj.type === TransitionType.Timed && 
                <div>
                    <label>Typ časování:</label>
                    <select>
                    </select>
                    <label>Hodnota:</label>
                    <input onChange={onTimeValueChange} type="number" min="0" value={obj.timeValue}></input>
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