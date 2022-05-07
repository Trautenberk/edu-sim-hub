import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface ITime extends IContBlock {

}

/**
 * Blok reprezentujícího čas
 */
export class Time extends ContBlock implements IToSerializable<ITime> {
    public className() { return Time.className; }
    public static className = "Time";
    public static MenuName  = "Čas";

    toSerializableObj(): ITime {
        {return super.toSerializableObj()}
    }
}