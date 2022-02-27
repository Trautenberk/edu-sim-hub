import { FunctionComponent } from "react";
import { ISimObject } from "../Model/SimObject";
import { ObjectSVGProps } from "./Editor/Canvas";

export interface ICanvasElementFactory {
    getElement (object : ISimObject) : FunctionComponent<ObjectSVGProps>;
}
