import { FunctionComponent } from "react";
import { ISimObject } from "../Model/SimObject";
import { ObjectEditProps, ObjectSVGProps } from "./Editor/Canvas";



export type GUIComponents = {
    SVGComponent : FunctionComponent<ObjectSVGProps>
    EditComponent : FunctionComponent<ObjectEditProps>;
}

export interface IObjectGUIComponentFactory {
    getElement (object : ISimObject) : GUIComponents;
}
