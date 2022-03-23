import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IDiv extends IEditorObject {

}

export class Div extends EditorObject implements IDiv, IToSerializable<IDiv> {
    public static MenuName = "DivBlock"
    
    constructor() 
    {
        super(Div.name);
    }
}