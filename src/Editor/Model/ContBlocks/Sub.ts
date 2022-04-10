import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface ISub extends IEditorObjectWithEndPoints {

}

export class Sub extends EditorObjectWithEndPoints implements IToSerializable<ISub> {
    public className() { return Sub.name; } 
    public static MenuName  = "Odčítání"
}