import { EditorObjectWithEndPoints, IEditorObjectWithEndPoints } from "../EditorObject";
import { IToSerializable } from "../UtilClasses/Coordinates";



export interface IContBlock extends IEditorObjectWithEndPoints{
    label : string;
}


export abstract class ContBlock extends EditorObjectWithEndPoints implements IToSerializable<IContBlock> {
    public label : string = "";
    public toSerializableObj(): IContBlock {
        return {...super.toSerializableObj(), label: this.label};
    }
}