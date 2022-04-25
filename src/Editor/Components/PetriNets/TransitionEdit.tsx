import { ObjectEditProps } from "App"
import { ITransition, TransitionType } from "Editor/Model/PetriNets/Transition";
import React, {FC} from "react"
import { useEditComponentUtils } from "../Utilities/CustomHooks";

export const TransitionEdit : FC<ObjectEditProps> = (props) => {
    const { obj, dispatchChange } = useEditComponentUtils<ITransition>(props.id); 
 
    const onLabelInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.label = e.currentTarget.value;
        dispatchChange(obj)
    }

    const onPriorityChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        obj.priority = parseInt(e.target.value);
        dispatchChange(obj)
    }

    const onSelectChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        obj.type = e.target.value as TransitionType;
        dispatchChange(obj)
    }

    const onTimeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        obj.timeValue = parseInt(e.target.value);
        dispatchChange(obj)
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
                        <option value={TransitionType.Immediate}>{TransitionType.Immediate}</option>
                        <option value={TransitionType.Constant}>{TransitionType.Constant}</option>
                        <option value={TransitionType.Exponential}>{TransitionType.Exponential}</option>
                    </select>
                </div>
                {obj.type === TransitionType.Immediate &&
                    <div>
                    <label>Priorita:</label> 
                    <input onChange={onPriorityChange} type="number" min="0" value={obj.priority}></input>
                </div>}


                {(obj.type === TransitionType.Exponential || obj.type === TransitionType.Constant) &&
                <div>
                    <label>Hodnota:</label>
                    <input onChange={onTimeValueChange} type="number" min="1" value={obj.timeValue}></input>
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