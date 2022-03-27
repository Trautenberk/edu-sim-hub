import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";

export interface IArch extends IEditorObject {
    placeId: string;
    transitionId: string;
    weight : number;
}

export abstract class Arch extends EditorObject implements IToSerializable<IArch> {
    private weight : number = 1;

    public placeId : string = "";

    public transitionId : string = "";

    public toSerializableObj(): IArch {
        return {weight: this.weight, placeId: this.placeId, transitionId: this.transitionId, ...super.toSerializableObj()};
    }
}

export class InputArch extends Arch implements IToSerializable<IArch> {
    public className() { return InputArch.name; }

    constructor(transitionId : string) {
        super()
        this.transitionId = transitionId;
    }
}

export class OutputArch extends Arch {
    public className() { return OutputArch.name }

    constructor(placeId : string) {
        super();
        this.placeId = placeId;
    }
}