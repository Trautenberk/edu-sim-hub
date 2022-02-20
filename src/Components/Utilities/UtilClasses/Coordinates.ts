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

    public add (obj : ICoordinates) {
        this.x += obj.x;
        this.y += obj.y;
        return this;
    }
    public sub (obj : ICoordinates) {
        this.x -= obj.x;
        this.y -= obj.y;
        return this;
    }

    public mul (obj : ICoordinates) {
        this.x *= obj.x;
        this.y *= obj.y;
        return this;
    }
    public div (obj : ICoordinates) {
        this.x /= obj.x;
        this.y /= obj.y;
        return this;
    }

    public scale (value : number) {
        this.mul({x: value, y: value});
        return this;
    }

    public power (value : number) {
        this.x =  Math.pow(this.x, value);
        this.y = Math.pow(this.y, value);
    }

    public static getDistance (begin : ICoordinates, end : ICoordinates) {
        const result = new Coordinates(end)
        result.sub(begin);
        result.power(2);
        return Math.sqrt(result.x + result.y);
    }

    public toString = () => {
        return `${this.x} ${this.y}`
    }
}