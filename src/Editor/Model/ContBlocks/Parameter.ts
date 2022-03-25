import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IParameter extends IEditorObject {

}

export class Parameter extends EditorObject implements IParameter, IToSerializable<IParameter> {
    public static MenuName  = "Parametr"
    
    constructor() 
    {
        super(Parameter.name);
    }
}