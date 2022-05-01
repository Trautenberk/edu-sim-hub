import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface IAdd extends IContBlock {

}

export class Add extends ContBlock implements  IToSerializable<IAdd> {
    public className(){ return Add.name; }  
    public static MenuName  = "Sčítání"
}