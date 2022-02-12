export interface ICoordinates {
    x : number
    y: number
}

export class Coordinates implements ICoordinates {
    public constructor();
    public constructor(obj : ICoordinates);
    public constructor(obj?: ICoordinates) {
        this.x = obj?.x ?? 0;
        this.y = obj?.y ?? 0;
    }
    public x : number = 0;
    public y : number = 0;

    public add(obj : ICoordinates) {
        this.x += obj.x;
        this.y += obj.y;
    }

    public sub(obj : ICoordinates) {
        this.x -= obj.x;
        this.y -= obj.y;
    }

    public mul(obj : ICoordinates) {
        this.x *= obj.x;
        this.y *= obj.y;
    }
    public div(obj : ICoordinates) {
        this.x /= obj.x;
        this.y /= obj.y;
    }
    public toString = () => {
        return ""
    }
}