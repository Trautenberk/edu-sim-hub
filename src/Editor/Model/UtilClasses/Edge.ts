import { EditorObject, IEditorObject } from "../EditorObject";
import { Coordinates, IToSerializable } from "./Coordinates";
import { IPoint } from "./Point";

export interface IEdge extends IEditorObject {
    pointsId : string[]
    from? : string,
    to? : string,
}

export function isEdge(obj : any): obj is IEdge{
    return (obj as IEdge).pointsId != undefined;
}

export abstract class Edge extends EditorObject implements IToSerializable<IEdge> {
    public  pointsId : string[] = [];

    public from? : string;
    public to? : string;

    constructor() {
        super();
    }

    toSerializableObj(): IEdge {
        return { ...super.toSerializableObj(), pointsId: this.pointsId, from: this.from, to: this.to }
    }

    public static getPathDescription (points: IPoint[]) : string {
    const description = [`M ${new Coordinates(points[0].coords).toString()}`];
    
    for(const item of (points.slice(1, points.length))) {
        description.push(`L ${new Coordinates(item.coords).toString()}`)
    }

    return description.join(" ");
    }
}