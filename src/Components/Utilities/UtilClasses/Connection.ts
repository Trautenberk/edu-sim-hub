import { Coordinates, ICoordinates } from "./Coordinates";
import { Point } from "./Point";


export class Connection {
    public id : string;
    private _points : Point[] = [];

    public constructor(id : string, points : Point[]);
    public constructor(id : string, value? : Point[] | Connection) {
        this.id = id;

        if(value != null) {
            if (value instanceof Connection ){
                this._points = [...value._points];
            } else {
                this._points = value;
            }
        }
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
        this._points.filter(item => item.id !== point.id);
    }

    public update (point : Point) : void {
        for (const item of this._points) {
            if (item.id === point.id) {
                item.coords = new Coordinates(point.coords);
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