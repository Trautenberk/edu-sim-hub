import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IGain extends IEditorObject {

}

export class Gain extends EditorObject implements IGain, IToSerializable<IGain> {
    public className() { return Gain.name; }
    public static MenuName = "Gain"
}