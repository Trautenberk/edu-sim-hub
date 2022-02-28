import { IToSerializable } from "Components/Utilities/UtilClasses/Coordinates";
import { ISimObject, SimObject } from "Model/SimObject";

export enum TransitionType {
    Priority = "Prioritní",
    Timed = "Časované",
    Probability = "Pravděpodobnostní"
}

export interface ITransition  extends ISimObject{
    label : string
    type : TransitionType
    priority : number
    timeValue : number
    probability : number
}

export class Transition extends SimObject implements ITransition, IToSerializable<ITransition>{
    public static Name : string = "Přechod";
    public priority : number = 0; 
    public label: string = "";
    public type: TransitionType = TransitionType.Priority;
    public timeValue: number = 0;
    public probability: number = 0;

    constructor()
    {
        super(Transition.name);
    }


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