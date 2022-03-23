import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IMul extends IEditorObject {

}

export class Mul extends EditorObject implements IMul, IToSerializable<IMul> {
    public static MenuName  = "MulBlock"
    
    constructor() 
    {
        super(Mul.name);
    }
}