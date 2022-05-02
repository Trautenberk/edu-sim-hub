import { IToSerializable } from "../UtilClasses/Coordinates";
import { ConnectionInfo, Edge, IEdge } from "../UtilClasses/Edge";



export interface ISignal extends IEdge {

}

export class Signal extends Edge implements IToSerializable<ISignal> {

    public className() { return Signal.className; }
    public static className = "Signal"

    constructor(from : ConnectionInfo) {
        super(from);
    }

    public toSerializableObj() : ISignal {
        return {...super.toSerializableObj()}
    }
}