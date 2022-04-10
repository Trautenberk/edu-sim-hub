import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IAdd extends IEditorObjectWithEndPoints {

}

export class Add extends EditorObjectWithEndPoints implements  IToSerializable<IAdd> {
    public className(){ return Add.name; }  
    public static MenuName  = "Sčítání"
}