import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";

export enum TransitionType {
    Immediate = "Okamžitý přechod",
    Constant = "Časovaný přechod - Konstatní",
    Exponential = "Časovaný přechod -  Exponenciální"
}

export interface ITransition  extends IEditorObjectWithEndPoints{
    label : string
    type : TransitionType
    priority : number
    timeValue : number
}

export class Transition extends EditorObjectWithEndPoints implements IToSerializable<ITransition>{
    public className() { return Transition.name; } 
    public static MenuName : string = "Přechod";
    public priority : number = 0; 
    public label: string = "";
    public type: TransitionType = TransitionType.Immediate;
    public timeValue: number = 1;
    public probability: number = 0;

    constructor(type? : TransitionType) {
        super();
        if (type != null)
            this.type = type;
    }

    public toSerializableObj() : ITransition {
        return {
            ...super.toSerializableObj(),
            priority : this.priority,
            label : this.label,
            timeValue : this.timeValue,
            type : this.type
        }
    }
}