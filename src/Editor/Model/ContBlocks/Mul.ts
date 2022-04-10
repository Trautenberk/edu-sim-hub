import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IMul extends IEditorObjectWithEndPoints {

}

export class Mul extends EditorObjectWithEndPoints implements IToSerializable<IMul> {
    public className() { return Mul.name; } 
    public static MenuName  = "Násobení"
}