import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IGain extends IEditorObject {

}

export class Gain extends EditorObject implements IGain, IToSerializable<IGain> {
    public static MenuName = "Gain"
    
    constructor() 
    {
        super(Gain.name);
    }
}