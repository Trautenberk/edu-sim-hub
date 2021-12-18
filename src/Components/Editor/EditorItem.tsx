import {ReactElement} from "react"

export abstract class EditorItem {
    abstract name : string;
    abstract iconPath: string | undefined;
    
    public  static   hasFilter() : boolean { throw new Error("Error, class has to overide this method")};
    public  static   filterID() : string | undefined { throw new Error("Error, class has to overide this method")};

    protected _idCounter : number = 0;
    
    protected  get idCount() : number  {
            return this._idCounter++;
    }

    protected getElementId = () => {
        return this.name.toLowerCase().replaceAll(" ", "_") + this.idCount;
    }
    
    abstract getCanvasElement : () => ReactElement;
}