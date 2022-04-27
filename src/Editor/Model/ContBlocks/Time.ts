import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface ITime extends IEditorObjectWithEndPoints {

}

export class Time extends EditorObjectWithEndPoints implements IToSerializable<ITime> {
    public className() { return Time.name; } 
    public static MenuName  = "Čas";

    toSerializableObj(): ITime {
        {return super.toSerializableObj()}
    }
}