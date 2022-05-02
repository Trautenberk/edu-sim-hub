import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IContBlock, ContBlock } from "./ContBlock";


export interface IConstant extends IContBlock {
    value : number;
}

export class Constant extends ContBlock implements IToSerializable<IConstant> {
    public className() {return Constant.className};
    public static className = "Constant";
    public static MenuName  = "Konstanta"

    public value : number = 1;

    public toSerializableObj(): IConstant {
        return {...super.toSerializableObj(), value : this.value};
    }
}