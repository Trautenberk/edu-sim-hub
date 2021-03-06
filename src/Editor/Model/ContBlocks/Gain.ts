import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface IGain extends IContBlock {
    gain : number
}

/**
 *  Blok zesilovače
 */
export class Gain extends ContBlock implements IToSerializable<IGain> {
    public className() { return Gain.className; }

    public static className = "Gain";
    public static MenuName = "Násobení konstantou";

    /**
     * Hodnota zesílení
     */
    public gain : number = 1;

    public toSerializableObj(): IGain {
        return {... super.toSerializableObj(), gain : this.gain};
    }
}