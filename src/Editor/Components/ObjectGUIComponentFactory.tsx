import { FunctionComponent } from "react";
import { IEditorObject } from "../Model/EditorObject";
import { ObjectEditProps, ObjectSVGProps } from "App";
import { EdgeSVGComponentProps } from "./Utilities/UtilComponents/EdgeSVG";

export type GUIComponents = {
    SVGComponent : FunctionComponent<ObjectSVGProps>
    EditComponent : FunctionComponent<ObjectEditProps>;
}

export interface IObjectGUIComponentFactory {
    getElement (object : IEditorObject) : GUIComponents;
    getEdgeGUI () : FunctionComponent<EdgeSVGComponentProps>;
}
