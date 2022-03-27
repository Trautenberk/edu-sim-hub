import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IMul extends IEditorObject {

}

export class Mul extends EditorObject implements IToSerializable<IMul> {
    public className() { return Mul.name; } 
    public static MenuName  = "Násobení"
}