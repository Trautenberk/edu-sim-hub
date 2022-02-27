import { FunctionComponent } from "react";
import { ISimObject } from "../Model/SimObject";
import { CanvasElementProps } from "./Editor/Canvas";

export interface ICanvasElementFactory {
    getElement (object : ISimObject) : FunctionComponent<CanvasElementProps>;
}
