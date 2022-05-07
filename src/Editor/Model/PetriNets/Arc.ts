import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject, NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { ConnectionInfo, Edge, IEdge } from "../UtilClasses/Edge";
import { IPoint } from "../UtilClasses/Point";
import { Transition } from "./Transition";
import { Place } from "./Place";


/**
 * Rozhraní pro třídu hrany.
 */
export interface IArc extends IEdge {
    placeId: string;    
    transitionId: string;   // TODO visi to pak blbe v reduxu
    weight : number;    
}

/**
 * Hrana spojující elementy Petriho sítě 
 */
export abstract class Arc extends Edge implements IToSerializable<IArc> {

    /**
     * Váha hrany
     */
    private weight : number = 1;

    /**
     * Id přechodu, který hrana spojuje
     *  */ 
    abstract get transitionId(): string;
    // Id místa, které hrana spojuje
    abstract get placeId() : string;


    public toSerializableObj(): IArc {
        return {...super.toSerializableObj(), weight: this.weight, transitionId: this.transitionId, placeId: this.placeId};
    }
}


/**
 * Vstupní hrana přechodu. 
 * Slouží k reprezentování vstupní hrany přechodu.
 */
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


/**
 * Výstupní hrana přechodu. 
 * Slouží k reprezentování výstupní hrany přechodu.
 */
export class OutputArc extends Arc {

    // ClassName pro identifikaci typu objektu v runtime
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