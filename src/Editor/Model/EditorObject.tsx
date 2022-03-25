import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";


export interface IEditorObject {
    id : string,
    typeName : string,
}

export abstract class EditorObject implements IEditorObject, IToSerializable<IEditorObject> {
    protected static _idCounter : number = 0;
    protected get idCount() : number {
        return EditorObject._idCounter++;
    }
    
    protected getElementId = (name : string) => {
        return name.toLowerCase().replaceAll(" ", "_") + this.idCount;
    }

    public readonly id : string;
    public readonly typeName : string;


    constructor(typeName : string)
    {
        this.id = this.getElementId(typeName);
        this.typeName = typeName;
    }

    public toSerializableObj() : IEditorObject {
        return {id : this.id, typeName : this.typeName}
    }
    
} 