import { Coordinates, IToSerializable } from "./Coordinates";
import { IPoint } from "./Point";

export interface IEdge {
    id : string
    pointsId : string[]
    from? : string,
    to? : string,
}

export class Edge implements IEdge, IToSerializable<IEdge> {
    public readonly id : string;
    public  pointsId : string[] = [];

    public from? : string;
    public to? : string;

    private static cnt = 0;

    public static getId() {
        return `Edge_${Edge.cnt++}`;
    }

    constructor(obj : IEdge) {
        this.id = obj.id;
        this.pointsId = obj.pointsId;
        this.from = obj.from;
        this.to = obj.to
    }

    toSerializableObj(): IEdge {
        return { id : this.id, pointsId: this.pointsId, from: this.from, to: this.to }
    }

    
    public static getPathDescription (points: IPoint[]) : string {
    const description = [`M ${new Coordinates(points[0].coords).toString()}`];
    
    for(const item of (points.slice(1, points.length))) {
        description.push(`L ${new Coordinates(item.coords).toString()}`)
    }

    return description.join(" ");
}
}