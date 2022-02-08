import { SimObject } from "Model/SimObject";


export class Place extends SimObject{
    public static Name : string = "Místo"

    constructor()
    {
        super(Place.name);
    }
}