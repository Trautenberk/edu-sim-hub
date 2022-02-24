import { Coordinates, ICoordinates, IToSerializable } from "./Coordinates";

export interface IPoint {
    id : string
    coords : ICoordinates
}

export interface IGroupPoint extends IPoint {
    groupCoords : ICoordinates;
}

export class Point implements IPoint, IToSerializable<IPoint> {
    public id : string  // identifikátor
    public coords : Coordinates    // absolutní souřadnice

    private static _cnt : number = 0;

    public static get cnt() {
        return Point._cnt++;
    }
    
    constructor (value : IPoint) {
        this.id = value.id;
        this.coords = new Coordinates(value.coords);
    }

    public toSerializableObj () : IPoint {
        return {id : this.id, coords: this.coords.toSerializableObj()};
    }
}


export class GroupPoint extends Point implements IGroupPoint, IToSerializable<IGroupPoint> {
    public groupCoords : Coordinates;   // ouřadnice v groupě

    constructor(value : IGroupPoint) {   // id, absolutní souřadnice celé groupy, souřadnice elementu v groupě
        super({...value});   // absolutní souřadnice bodu se vypočítají jako souřadnice celé groupu + souřadnice elementu v groupě
        this.groupCoords = new Coordinates(value.groupCoords);
    }

    public toSerializableObj () : IGroupPoint {
        const obj = super.toSerializableObj();
        const groupObj = {...obj, groupCoords: this.groupCoords.toSerializableObj()} as IGroupPoint
        return groupObj;
    }
}