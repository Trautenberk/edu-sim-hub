import { Coordinates, IToSerializable } from "./Coordinates";
import { IPoint } from "./Point";

export interface IEdge {
    id : string
    pointsId : string[]
    isComplete : boolean
}

export class Edge implements IEdge, IToSerializable<IEdge> {
    public readonly id: string;
    public  pointsId: string[] = [];
    public isComplete: boolean = false;

    private static cnt = 0;

    public static getId() {
        return `Edge_${Edge.cnt}`;
    }

    constructor(obj : IEdge) {
        this.id = obj.id;
        this.isComplete = obj.isComplete;
        this.pointsId = obj.pointsId;
    }

    toSerializableObj(): IEdge {
        return { id : this.id, isComplete : this.isComplete, pointsId: this.pointsId }
    }

    
    public static getPathDescription (points: IPoint[]) : string {
    const description = [`M ${new Coordinates(points[0].coords).toString()}`];
    
    for(const item of (points.slice(1, points.length))) {
        description.push(`L ${new Coordinates(item.coords).toString()}`)
    }

    return description.join(" ");
}
}