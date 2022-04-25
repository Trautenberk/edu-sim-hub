import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObjectWithEndPoints, EditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IGain extends IEditorObjectWithEndPoints {
    gain : number
}

export class Gain extends EditorObjectWithEndPoints implements IToSerializable<IGain> {
    public className() { return Gain.name; }
    public static MenuName = "Gain";

    public gain : number = 1;

    public toSerializableObj(): IGain {
        return {... super.toSerializableObj(), gain : this.gain};
    }
}