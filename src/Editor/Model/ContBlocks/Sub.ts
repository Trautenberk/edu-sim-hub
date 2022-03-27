import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface ISub extends IEditorObject {

}

export class Sub extends EditorObject implements ISub, IToSerializable<ISub> {
    public className() { return Sub.name; } 
    public static MenuName  = "Odčítání"
}