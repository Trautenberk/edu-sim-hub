import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IIntegrator extends IEditorObject {

}

export class Integrator extends EditorObject implements IIntegrator, IToSerializable<IIntegrator> {
    public static MenuName  = "IntegratorBlock"
    
    constructor() 
    {
        super(Integrator.name);
    }
}