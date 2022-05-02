import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { ConnectionInfo, Edge, IEdge } from "../UtilClasses/Edge";
import { IPoint } from "../UtilClasses/Point";
import { Transition } from "./Transition";
import { Place } from "./Place";


////////////////////////////////////////////////////////////////
//// Arc
export interface IArc extends IEdge {
    placeId: string;
    transitionId: string;   // TODO visi to pak blbe v reduxu
    weight : number;
}


export abstract class Arc extends Edge implements IToSerializable<IArc> {
    private weight : number = 1;

    abstract get transitionId(): string;
    abstract get placeId() : string;

    public toSerializableObj(): IArc {
        return {...super.toSerializableObj(), weight: this.weight, transitionId: this.transitionId, placeId: this.placeId};
    }
}


////////////////////////////////////////////////////////////////
//// InputArc
export class InputArc extends Arc implements IToSerializable<IArc> {
    public className() { return InputArc.className; }
    public static className = "InputArc"; 

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
        this.allowedClassNames = [Transition.name];
    }
}


////////////////////////////////////////////////////////////////
/// OutputArc


export class OutputArc extends Arc {
    public className() { return OutputArc.className }
    public static className = "OutputArc";

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
        this.allowedClassNames = [Place.name];
    }
}