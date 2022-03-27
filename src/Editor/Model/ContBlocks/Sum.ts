import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface ISum extends IEditorObject {

}

export class Sum extends EditorObject implements ISum, IToSerializable<ISum> {
    public className() { return Sum.name; } 
    public static MenuName  = "SumBlock";
}