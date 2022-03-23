import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { IEditorObject } from "Editor/Model/EditorObject";
import { FC } from "react";
import { Add, Div, Sub, Mul, Constant, Gain } from "Editor/Model/ContBlocks"
import { AddSVG, DivSVG, SubSVG, MulSVG, ConstantSVG, GainSVG } from "Editor/Components/ContBlocks"


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
            case Sub.name:
                return {SVGComponent: SubSVG, EditComponent : emptyComponent};
            case Mul.name:
                return {SVGComponent: MulSVG, EditComponent : emptyComponent};
            case Constant.name:
                return {SVGComponent: ConstantSVG, EditComponent : emptyComponent};
            case Gain.name:
                return {SVGComponent: GainSVG, EditComponent : emptyComponent}; 
            default:
                throw new Error("Couldnt find SVG component for given object");
        }
    }
}