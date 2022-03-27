import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IDiv extends IEditorObject {

}

export class Div extends EditorObject implements IDiv, IToSerializable<IDiv> {
    public className() { return Div.name; }
    public static MenuName = "Dělení"
    
}