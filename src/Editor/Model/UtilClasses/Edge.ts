import { EditorObject, IEditorObject } from "../EditorObject";
import { Coordinates, IToSerializable } from "./Coordinates";
import { IEndPoint, IPoint } from "./Point";


export interface IEdge extends IEditorObject {
    pointsId : string[]
    from : ConnectionInfo | null,
    to : ConnectionInfo | null,
    allowedClassNames: string[] // kolekce typu objektu, jenž můžou být na konci hrany
}

export function isEdge(obj : any): obj is IEdge{
    return (obj as IEdge).pointsId != undefined;
}

export type ConnectionInfo = {
    pointId : string
    objId : string 
}

export abstract class Edge extends EditorObject implements IToSerializable<IEdge> {
    public  pointsId : string[] = [];

    public from : ConnectionInfo | null = null
    public to : ConnectionInfo | null = null;

    public  allowedClassNames : string[] = [] 

    constructor(from : ConnectionInfo, allowedTypes? : string[]) {
        super();
        this.from = from;
        if (allowedTypes != null)
            this. allowedClassNames = allowedTypes;
    }

    toSerializableObj(): IEdge {
        return { ...super.toSerializableObj(), pointsId: this.pointsId, from: this.from, to: this.to,  allowedClassNames: this.allowedClassNames }
    }

    public static getPathDescription (points: IPoint[]) : string {
    const description = [`M ${new Coordinates(points[0].coords).toString()}`];
    
    for(const item of (points.slice(1, points.length))) {
        description.push(`L ${new Coordinates(item.coords).toString()}`)
    }

    return description.join(" ");
    }
}