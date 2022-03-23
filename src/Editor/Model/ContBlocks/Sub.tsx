import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface ISub extends IEditorObject {

}

export class Sub extends EditorObject implements ISub, IToSerializable<ISub> {
    public static MenuName  = "SubBlock"
    
    constructor() 
    {
        super(Sub.name);
    }
}