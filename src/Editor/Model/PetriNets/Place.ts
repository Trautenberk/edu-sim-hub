import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IPlace extends IEditorObjectWithEndPoints {
    label : string
    tokenCount : number
}


const PLACE_CLASSNAME = "Place"
export class Place extends EditorObjectWithEndPoints implements IToSerializable<IPlace>{
    public className() { return PLACE_CLASSNAME; } 

    public static className =  PLACE_CLASSNAME; 

    public static MenuName : string = "Místo"

    public tokenCount : number = 0;
    public label: string = "";

    public toSerializableObj(): IPlace {
        return {...super.toSerializableObj(), label : this.label, tokenCount : this.tokenCount}
    }
}