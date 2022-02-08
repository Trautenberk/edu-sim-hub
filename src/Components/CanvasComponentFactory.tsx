import { FunctionComponent } from "react";
import { SimObject } from "../Model/SimObject";
import { CanvasElementProps } from "./Editor/Canvas";

export interface ICanvasElementFactory {
    getElement (object : SimObject) : FunctionComponent<CanvasElementProps>;
}
