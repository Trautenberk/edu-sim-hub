import { Coordinates, ICoordinates } from "./Coordinates";

export interface IPoint {
    id : string
    coords : ICoordinates
    connectionsId : string[]  
}

export interface IGroupPoint extends IPoint {
    groupCoords : ICoordinates;
}

export class Point implements IPoint {
    public id : string  // identifikátor
    public coords : Coordinates    // absolutní souřadnice

    public connectionsId : string[] = []; // pole id connections ve kterych je bod obsazen  

    private static _cnt : number = 0;

    public static get cnt() {
        return Point._cnt++;
    }
    
    constructor (value : IPoint) {
        this.id = value.id;
        this.connectionsId = value.connectionsId;
        this.coords = new Coordinates(value.coords);
    }
}


export class GroupPoint extends Point implements IGroupPoint {
    public groupCoords : Coordinates;   // ouřadnice v groupě

    constructor(value : IGroupPoint) {   // id, absolutní souřadnice celé groupy, souřadnice elementu v groupě
        super({...value});   // absolutní souřadnice bodu se vypočítají jako souřadnice celé groupu + souřadnice elementu v groupě
        this.groupCoords = new Coordinates(value.groupCoords);
    }
}