import { IToSerializable } from "Editor/Components/Utilities/UtilClasses/Coordinates";


export interface ISimObject {
    id : string,
    typeName : string,
}

export abstract class SimObject implements ISimObject, IToSerializable<ISimObject> {
    public static Name: string;
    protected static _idCounter : number = 0;
    protected get idCount() : number {
        return SimObject._idCounter++;
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

    public toSerializableObj() : ISimObject {
        return {id : this.id, typeName : this.typeName}
    }
    
} 