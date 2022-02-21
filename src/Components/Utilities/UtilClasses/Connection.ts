import { Coordinates } from "./Coordinates";
import { IPoint, Point } from "./Point";

export interface IConnection {
    id : string
    points : IPoint[]

}

export class Connection implements IConnection {
    public id : string;
    private _points : Point[] = [];

    public constructor(value :  IConnection) {
      this.id = value.id;
      this._points = value.points.map(item => new Point(item))
    }
    public get points() : Point[] { 
        return this._points;
    }

    public set points(newPoints : Point[]) {
        this._points = newPoints;
    }

    public add (point : Point) : void {
        this._points.push(point);
    }

    public remove (point : Point) : void {
        this._points = this._points.filter(item => item.id !== point.id);
    }

    public connectToEndPoint (endPoint : Point) {
        this._points.pop();         // smaže poslední
        this._points.push(endPoint); // nastaví endPoint Jako Poslední
    }

    public update (point : Point) : void {
        for (const item of this._points) {
            if (item.id === point.id) {
                item.coords = point.coords;
                item.connectionsId = point.connectionsId
            }
        }
    }

    public getPathDescription () : string {
        const description = [`M ${this._points[0].coords.toString()}`]
        
        for(const item of (this._points.slice(1, this._points.length))) {
            description.push(`L ${item.coords.toString()}`)
        }

        return description.join(" ");
    }
}