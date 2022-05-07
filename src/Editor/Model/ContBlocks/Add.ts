import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface IAdd extends IContBlock {

}

/**
 * Blok pro operaci sčítání
 */

export class Add extends ContBlock implements  IToSerializable<IAdd> {
    public className(){ return Add.className; }
    public static className = "Add";
    public static MenuName  = "Sčítání"
}