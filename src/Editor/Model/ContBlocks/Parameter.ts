import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IParameter extends IEditorObject {

}

export class Parameter extends EditorObject implements IToSerializable<IParameter> {
    public className() { return Parameter.name;} 
    public static MenuName  = "Parametr";
}