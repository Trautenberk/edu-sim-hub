import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { IEditorObject, EditorObject } from "Editor/Model/EditorObject";


export interface IIntegrator extends IEditorObject {

}

export class Integrator extends EditorObject implements IIntegrator, IToSerializable<IIntegrator> {
    public className() { return  Integrator.name; }
    public static MenuName  = "IntegratorBlock"
}