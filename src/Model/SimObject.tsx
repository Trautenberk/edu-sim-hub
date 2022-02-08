
export abstract class SimObject {
    public static Name: string;
    protected static _idCounter : number = 0;
    protected get idCount() : number {
        return SimObject._idCounter++;
    }
    protected getElementId = (name : string) => {
        return name.toLowerCase().replaceAll(" ", "_") + this.idCount;
    }

    public id : string;

    constructor(name : string)
    {
        this.id = this.getElementId(name);
    }
    
} 