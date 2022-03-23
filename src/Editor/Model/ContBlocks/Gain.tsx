import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IGain extends IEditorObject {

}

export class Gain extends EditorObject implements IGain, IToSerializable<IGain> {
    public static MenuName = "GainBlock"
    
    constructor() 
    {
        super(Gain.name);
    }
}