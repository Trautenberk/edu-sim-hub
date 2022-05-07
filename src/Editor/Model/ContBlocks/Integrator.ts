import { IToSerializable } from "Editor/Model/UtilClasses/Coordinates";
import { EditorObjectWithEndPoints, IEditorObjectWithEndPoints } from "Editor/Model/EditorObject";
import { ContBlock, IContBlock } from "./ContBlock";


export interface IIntegrator extends IContBlock {
    initialValue : number
}

/**
 *  Blok Integrátoru
 */
export class Integrator extends ContBlock implements IToSerializable<IIntegrator> {
    public className() { return  Integrator.className; }
    public static className = "Integrator"
    public static MenuName  = "Integrátor";

    /**
     * Počáteční podmínka
     */
    public initialValue : number = 0;

    public toSerializableObj(): IIntegrator {
        return {...super.toSerializableObj(), initialValue: this.initialValue }
    }
}