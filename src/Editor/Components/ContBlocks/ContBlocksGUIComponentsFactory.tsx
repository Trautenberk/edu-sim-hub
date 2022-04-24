import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { IEditorObject } from "Editor/Model/EditorObject";
import { FC, FunctionComponent } from "react";
import { Add, Div, Sub, Mul, Constant, Gain } from "Editor/Model/ContBlocks"
import { AddSVG, DivSVG, SubSVG, MulSVG, ConstantSVG, GainSVG } from "Editor/Components/ContBlocks"
import { EdgeSVG, EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";
import { SignalSVG } from "./SignalSVG";
import { Signal } from "Editor/Model/ContBlocks/Signal";
import { ContBlockSimulationParamsEdit } from "./ContBlockSimulationParamsEdit";
import { EmptyComponent } from "../Utilities/UtilMethodsAndTypes";



export class ContBlocksGUIComponentFactory implements IObjectGUIComponentFactory {
    getEdgeGUI(): FunctionComponent<EdgeSVGComponentProps> {
        return EdgeSVG;
    }
    
    getElement (object : IEditorObject): GUIComponents  {
        switch(object.className) {
            case Div.name:
                return {SVGComponent: DivSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            case Add.name:
                return {SVGComponent: AddSVG, EditComponent :EmptyComponent, StatisticsComponent: EmptyComponent};
            case Sub.name:
                return {SVGComponent: SubSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            case Mul.name:
                return {SVGComponent: MulSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            case Constant.name:
                return {SVGComponent: ConstantSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            case Gain.name:
                return {SVGComponent: GainSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            case Signal.name:
                    return {SVGComponent: SignalSVG, EditComponent : EmptyComponent, StatisticsComponent: EmptyComponent};
            default:
                throw new Error("Couldnt find SVG component for given object");
        }
    }

    getSimulationParamsEdit(): FunctionComponent<{}> {
        return ContBlockSimulationParamsEdit;
    }
}