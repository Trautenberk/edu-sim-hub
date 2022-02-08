import { ReactElement } from "react";
import { SimObject } from "../Model/SimObject";

export interface ICanvasElementFactory {
    getElement (object : SimObject) : ReactElement;
}
