import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IGain extends IEditorObjectWithEndPoints {

}

export class Gain extends EditorObjectWithEndPoints implements IToSerializable<IGain> {
    public className() { return Gain.name; }
    public static MenuName = "Gain"
}