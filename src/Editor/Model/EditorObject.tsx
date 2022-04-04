import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";


export interface IEditorObject {
    id : string,
    className : string;
}

export const NULL_OBJ_ID = "NULL_OBJ_ID";

export abstract class EditorObject implements  IToSerializable<IEditorObject> {
    protected static _idCounter : number = 0;
    protected get idCount() : number {
        return EditorObject._idCounter++;
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
    endPointIds : string[]
}

export abstract class EditorObjectWithEndPoints extends EditorObject implements IToSerializable<IEditorObjectWithEndPoints>{
    public endPointIds : string[] = []

    public toSerializableObj() : IEditorObjectWithEndPoints {
        return { ...super.toSerializableObj(), endPointIds: this.endPointIds }
    }
}