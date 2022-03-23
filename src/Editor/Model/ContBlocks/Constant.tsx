import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IConstant extends IEditorObject {

}

export class Constant extends EditorObject implements IConstant, IToSerializable<IConstant> {
    public static NamMenuName  = "ConstantBlock"
    
    constructor() 
    {
        super(Constant.name);
    }
}