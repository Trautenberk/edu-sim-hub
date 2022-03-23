import { FunctionComponent } from "react";
import { IEditorObject } from "../Model/EditorObject";
import { ObjectEditProps, ObjectSVGProps } from "Editor/Components/Canvas";

export type GUIComponents = {
    SVGComponent : FunctionComponent<ObjectSVGProps>
    EditComponent : FunctionComponent<ObjectEditProps>;
}

export interface IObjectGUIComponentFactory {
    getElement (object : IEditorObject) : GUIComponents;
}
