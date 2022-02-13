import { Coordinates, ICoordinates } from "./Coordinates";
import { Point } from "./Point";


export class Connection {
    private _points : Point[] = [];

    public constructor();
    public constructor(points : Point[]);
    public constructor(value? : Point[] | Connection) {
        if(value != null) {
            if (value instanceof Connection ){
                this._points = [...value._points];
            } else {
                this._points = value;
            }
        }
    }
    public get points() {
        return this._points;
    }

    public set points(newPoints : Point[]) {
        this._points = newPoints;
    }

    public add (point : Point) {
        this._points.push(point);
    }

    public remove (point : Point) {
        this._points.filter(item => item.id !== point.id);
    }

    public update (id : string, newCoords : ICoordinates) {
        for (const item of this._points) {
            if (item.id === id) {
                item.coords = new Coordinates(newCoords);
            }
        }
    }
}