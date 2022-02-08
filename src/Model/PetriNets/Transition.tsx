import { SimObject } from "Model/SimObject";


export class Transition extends SimObject {
    public static Name : string = "Přechod";

    constructor()
    {
        super(Transition.name);
    }
}