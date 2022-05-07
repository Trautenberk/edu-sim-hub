import { EditorObjectWithEndPoints, IEditorObjectWithEndPoints } from "../EditorObject";
import { IToSerializable } from "../UtilClasses/Coordinates";



export interface IContBlock extends IEditorObjectWithEndPoints{
    label : string;
}


/**
 * Rodičovská třída pro bloky.
 */
export abstract class ContBlock extends EditorObjectWithEndPoints implements IToSerializable<IContBlock> {
    /**
     * Návěští
     */
    public label : string = "";
    public toSerializableObj(): IContBlock {
        return {...super.toSerializableObj(), label: this.label};
    }
}