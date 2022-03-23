import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { IEditorObject } from "Editor/Model/EditorObject";
import { FC } from "react";
import { Add, Div } from "Editor/Model/ContBlocks"
import { AddSVG, DivSVG } from "Editor/Components/ContBlocks"


const emptyComponent : FC = () => {
    return (<></>)
}

export class ContBlocksGUIComponentFactory implements IObjectGUIComponentFactory {
    getElement (object : IEditorObject): GUIComponents  {
        switch(object.typeName) {
            case Div.name:
                return {SVGComponent: DivSVG, EditComponent : emptyComponent};
            case Add.name:
                return {SVGComponent: AddSVG, EditComponent :emptyComponent};
            default:
                throw new Error("Tempory error");
        }
    }
}