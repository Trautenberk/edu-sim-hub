import { IToSerializable } from "Components/Utilities/UtilClasses/Coordinates";
import { ISimObject, SimObject } from "Model/SimObject";


export interface ITransition  extends ISimObject{
    priority : number
}

export class Transition extends SimObject implements ITransition, IToSerializable<ITransition>{
    public static Name : string = "Přechod";

    public priority : number = 0; 

    constructor()
    {
        super(Transition.name);
    }

    public toSerializableObj() : ITransition {
        const superObj = super.toSerializableObj()
        return {...superObj, priority : this.priority} // TODO tady se da pouzit dekonstrukce, podivat se jestli by to neslo teda zjednodusit vsude
    }
}