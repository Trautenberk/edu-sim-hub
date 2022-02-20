import { Coordinates, ICoordinates } from "./Coordinates";

export class Point  {
    public id : string  // identifikátor
    public coords : Coordinates    // absolutní souřadnice

    private _connectionsId : string[] = []; // pole id connections ve kterych je bod obsazen  

    public get ConnectionsId () : string[] {
        return this._connectionsId;
    }

    private static _cnt : number = 0;

    public static get cnt() {
        return Point._cnt++;
    }
    
    constructor(id : string, coords : ICoordinates)
    constructor(id: string, coords? : ICoordinates){
        this.id = id;
        this.coords = coords != null ? new Coordinates(coords) : new Coordinates();
    }

    public addConnectionId (id : string) {
        this._connectionsId.push(id);
    }

    public removeConnectionId (id : string) {
        this._connectionsId = this._connectionsId.filter(item => item !== id)
    }
}


export class GroupPoint extends Point {
    public groupCoords : Coordinates;   // ouřadnice v groupě

    constructor(id : string, groupAbsoluteCoords : ICoordinates, insideGroupCoords : ICoordinates) {   // id, absolutní souřadnice celé groupy, souřadnice elementu v groupě
        super(id, new Coordinates(groupAbsoluteCoords).add(insideGroupCoords));   // absolutní souřadnice bodu se vypočítají jako souřadnice celé groupu + souřadnice elementu v groupě
        this.groupCoords = new Coordinates(insideGroupCoords);
    }
}