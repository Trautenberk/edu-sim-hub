import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";

export enum TransitionType {
    Priority = "Prioritní",
    Timed = "Časované",
    Probability = "Pravděpodobnostní"
}

export interface ITransition  extends IEditorObject{
    label : string
    type : TransitionType
    priority : number
    timeValue : number
    probability : number
}

export class Transition extends EditorObject implements IToSerializable<ITransition>{
    public className() { return Transition.name; } 
    public static MenuName : string = "Přechod";
    public priority : number = 0; 
    public label: string = "";
    public type: TransitionType = TransitionType.Priority;
    public timeValue: number = 0;
    public probability: number = 0;

    public toSerializableObj() : ITransition {
        const superObj = super.toSerializableObj()
        return {
            ...superObj,
            priority : this.priority,
            label : this.label,
            timeValue : this.timeValue,
            probability : this.probability,
            type : this.type
        }
    }
}