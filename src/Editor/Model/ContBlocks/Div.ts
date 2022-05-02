import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IContBlock, ContBlock } from "./ContBlock";


export interface IDiv extends IContBlock {

}


export class Div extends ContBlock implements IToSerializable<IDiv> {
    public className() { return Div.className; }
    public static className = "Div";
    public static MenuName = "Dělení"
    
}