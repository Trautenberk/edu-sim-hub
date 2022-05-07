import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IPlace extends IEditorObjectWithEndPoints {
    label : string
    tokenCount : number
}

/**
 * Místo Petriho sítí 
 */
export class Place extends EditorObjectWithEndPoints implements IToSerializable<IPlace>{
    public className() { return Place.className; } 

    public static className = "Place"; 

    public static MenuName : string = "Místo"

    /**
     * Počet tokenů v místě
     */
    public tokenCount : number = 0;
    
    /**
     * Návěští
     */
    public label: string = "";

    public toSerializableObj(): IPlace {
        return {...super.toSerializableObj(), label : this.label, tokenCount : this.tokenCount}
    }
}