import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface ISub extends IContBlock {

}

/**
 *  Blok operace odčítaní
 */
export class Sub extends ContBlock implements IToSerializable<ISub> {
    public className() { return Sub.className; } 

    public static className = "Sub";
    public static MenuName  = "Odčítání"
}