import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { ConnectionInfo, Edge, IEdge } from "../UtilClasses/Edge";
import { IPoint } from "../UtilClasses/Point";

export interface IArch extends IEdge {
    placeId: string;
    transitionId: string;   // TODO visi to pak blbe v reduxu
    weight : number;
}

export abstract class Arch extends Edge implements IToSerializable<IArch> {
    private weight : number = 1;

    abstract get transitionId(): string;
    abstract get placeId() : string;

    public toSerializableObj(): IArch {
        return {...super.toSerializableObj(), weight: this.weight, transitionId: this.transitionId, placeId: this.placeId};
    }
}

export class InputArch extends Arch implements IToSerializable<IArch> {
    public className() { return InputArch.name; }

    public get transitionId() : string {
        if (this.to != null) 
            return this.to.objId;
        else
            return NULL_OBJ_ID;
    }

    public get placeId() : string {
        if (this.from != null) 
            return this.from.objId;
        else
            return NULL_OBJ_ID;
    }

    constructor(from : ConnectionInfo) {
        super(from);
    }
}

export class OutputArch extends Arch {
    public className() { return OutputArch.name }

    public get transitionId() : string {
        if (this.from != null) 
            return this.from.objId;
        else
            return NULL_OBJ_ID;
    }

    public get placeId() : string {
        if (this.to != null) 
            return this.to.objId;
        else
            return NULL_OBJ_ID;
    }

    constructor(from : ConnectionInfo) {
        super(from);
    }
}