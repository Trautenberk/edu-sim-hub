import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface IMul extends IContBlock {

}

/**
 * Blok operace násobení
 */
export class Mul extends ContBlock implements IToSerializable<IMul> {
    public className() { return Mul.className; } 
    public static className = "Mul"
    public static MenuName  = "Násobení"
}