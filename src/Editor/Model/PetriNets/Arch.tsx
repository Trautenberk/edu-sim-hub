import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";

export interface IArch extends IEditorObject {}

export class Arch extends EditorObject implements IArch, IToSerializable<IArch> {
    private weight : number = 1
    public toSerializableObj(): IEditorObject {
        return super.toSerializableObj();
    }
}