import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { EditorObjectWithEndPoints, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IDiv extends IEditorObjectWithEndPoints {

}

export class Div extends EditorObjectWithEndPoints implements IToSerializable<IDiv> {
    public className() { return Div.name; }
    public static MenuName = "Dělení"
    
}