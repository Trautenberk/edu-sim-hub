import { ReactElement } from "react";

export type CanvasComponent = {id : string, element : ReactElement}  /// TODO vymyslet lepší název a sémantiky tady

export interface IComponentFactory {
    getElement (type : string) : CanvasComponent;
}
export default abstract class ComponentFactory implements IComponentFactory {
    protected _idCounter : number = 0;
    protected get idCount() : number {
        return this._idCounter++;
    }
    protected getElementId = (name : string) => {
        return name.toLowerCase().replaceAll(" ", "_") + this.idCount;
    }
    abstract getElement (type : string) : CanvasComponent; 
}