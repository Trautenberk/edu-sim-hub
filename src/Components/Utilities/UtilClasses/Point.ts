import { Coordinates, ICoordinates } from "./Coordinates";

export class Point  {
    id : string
    coords : Coordinates

    constructor(id: string, coords? : ICoordinates){
        this.id = id;
        this.coords =  coords != null ? new Coordinates(coords) : new Coordinates();
    }
}