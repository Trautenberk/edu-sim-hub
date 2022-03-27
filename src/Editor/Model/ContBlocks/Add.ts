import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IAdd extends IEditorObject {

}

export class Add extends EditorObject implements  IToSerializable<IAdd> {
    public className(){ return Add.name; }  
    public static MenuName  = "Sčítání"
}