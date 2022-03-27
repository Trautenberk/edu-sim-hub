import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IConstant extends IEditorObject {

}

export class Constant extends EditorObject implements IToSerializable<IConstant> {
    public className() {return Constant.name} ;
    public static MenuName  = "Konstanta"
}