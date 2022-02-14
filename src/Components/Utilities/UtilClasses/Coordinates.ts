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
        return this.add;
    }

    public scale (value : number) {
        this.div({x: value, y: value});
        return this;
    }
    public toString = () => {
        return `${this.x} ${this.y}`
    }
}