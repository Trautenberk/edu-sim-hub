import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IPlace extends IEditorObject {
    label : string
    tokenCount : number
}

export function isPlace(obj : IEditorObject | IPlace) : obj is Place {
    return  obj.typeName === Place.name;
}

export class Place extends EditorObject implements IPlace, IToSerializable<IPlace>{
    public static MenuName : string = "Místo"

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