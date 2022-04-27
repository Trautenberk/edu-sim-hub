import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { EditorObjectWithEndPoints, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";


export interface IIntegrator extends IEditorObjectWithEndPoints {
    initialValue : number
}

export class Integrator extends EditorObjectWithEndPoints implements IToSerializable<IIntegrator> {
    public className() { return  Integrator.name; }
    public static MenuName  = "Integrátor";

    public initialValue : number = 0;

    public toSerializableObj(): IIntegrator {
        return {...super.toSerializableObj(), initialValue: this.initialValue }
    }
}