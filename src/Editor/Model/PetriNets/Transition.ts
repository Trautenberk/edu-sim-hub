import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


/**
 * Typ přechodu
 */
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

/**
 * Přechod Petriho sítě.
 * Pro odlišení typu třídy slouží atribut typ pro zjednodušení. Zvolený postup má výhodu
 * v tom, že lze velmi jednoduše přepnout typ přechodu a není nutné kvůli tomu vytvářet novou instanci.
 */
export class Transition extends EditorObjectWithEndPoints implements IToSerializable<ITransition>{
    public className() { return Transition.className }    
    public static className = "Transition";
    public static MenuName : string = "Přechod";

    /**
     * Priorita přechodu
     */
    public priority : number = 0; 
    
    /**
     * Návěští 
     */
    public label: string = "";

    /**
     * Typ přechodu.
     */
    public type: TransitionType = TransitionType.Immediate;
    
    /**
     * Hodnota zpoždění
     */
    public timeValue: number = 1;

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