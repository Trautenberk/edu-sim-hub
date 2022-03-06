import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { ISimObject, SimObject } from "Editor/Model/SimObject";


export interface IPlace extends ISimObject {
    label : string
    tokenCount : number
}

export function isPlace(obj : ISimObject | IPlace) : obj is Place {
    return  obj.typeName === Place.name;
}

export class Place extends SimObject implements IPlace, IToSerializable<IPlace>{
    public static Name : string = "Místo"

    public tokenCount : number = 0;
    public label: string = "";

    constructor()
    {
        super(Place.name);
    }

    public toSerializableObj(): IPlace {
        const superObj = super.toSerializableObj();
        return {...superObj, label : this.label, tokenCount : this.tokenCount}
    }
}