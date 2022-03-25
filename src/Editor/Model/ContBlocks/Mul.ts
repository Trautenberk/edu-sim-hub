import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IMul extends IEditorObject {

}

export class Mul extends EditorObject implements IMul, IToSerializable<IMul> {
    public static MenuName  = "Násobení"
    
    constructor() 
    {
        super(Mul.name);
    }
}