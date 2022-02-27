import { IToSerializable } from "Components/Utilities/UtilClasses/Coordinates";
import { ISimObject, SimObject } from "Model/SimObject";


export interface IPlace extends ISimObject {

}

export class Place extends SimObject implements IPlace, IToSerializable<IPlace>{
    public static Name : string = "Místo"

    constructor()
    {
        super(Place.name);
    }

    public toSerializableObj(): IPlace {
        const superObj = super.toSerializableObj();
        return {...superObj}
    }
}