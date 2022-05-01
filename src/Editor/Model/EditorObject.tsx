import { INITIAL_COORDINATES } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { ICoordinates, IToSerializable } from "Editor/Model/UtilClasses/Coordinates";


export interface IEditorObject {
    id : string,
    className : string;
}

let EDITOR_OBJEC_COUNTER = 0;
export function SetEditorObjectCounter(value : number) {
    EDITOR_OBJEC_COUNTER = value;
}

export const NULL_OBJ_ID = "NULL_OBJ_ID";

export abstract class EditorObject implements  IToSerializable<IEditorObject> {
    protected get idCount() : number {
        return EDITOR_OBJEC_COUNTER++;
    }

    public readonly id : string;
    public abstract className() : string;
    protected getElementId = () => { 
        return `${this.className().toLowerCase()}_${this.idCount}`;
    }

    constructor()
    {
        this.id = this.getElementId();
    }

    public toSerializableObj() : IEditorObject {
        return {id : this.id, className : this.className(),}
    }
    
} 

export interface IEditorObjectWithEndPoints extends IEditorObject {

    coordinates : ICoordinates 
    endPointIds : string[]
}

export abstract class EditorObjectWithEndPoints extends EditorObject implements IToSerializable<IEditorObjectWithEndPoints>{
    public endPointIds : string[] = []

    public coordinates : ICoordinates = INITIAL_COORDINATES;

    public toSerializableObj() : IEditorObjectWithEndPoints {
        return { ...super.toSerializableObj(), endPointIds: this.endPointIds, coordinates: this.coordinates}
    }
}