import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IPlace extends IEditorObject {
    label : string
    tokenCount : number
}

export class Place extends EditorObject implements IToSerializable<IPlace>{
    public className() { return Place.name; } 
    public static MenuName : string = "Místo"

    public tokenCount : number = 0;
    public label: string = "";

    public toSerializableObj(): IPlace {
        const superObj = super.toSerializableObj();
        return {...superObj, label : this.label, tokenCount : this.tokenCount}
    }
}