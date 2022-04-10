import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IConstant extends IEditorObjectWithEndPoints {

}

export class Constant extends EditorObjectWithEndPoints implements IToSerializable<IConstant> {
    public className() {return Constant.name} ;
    public static MenuName  = "Konstanta"
}