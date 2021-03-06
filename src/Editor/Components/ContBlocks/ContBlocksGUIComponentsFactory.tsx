import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { IEditorObject } from "Editor/Model/EditorObject";
import { FC, FunctionComponent } from "react";
import { Add, Div, Sub, Mul, Constant, Gain, Integrator } from "Editor/Model/ContBlocks"
import { AddSVG, DivSVG, SubSVG, MulSVG, ConstantSVG, GainSVG } from "Editor/Components/ContBlocks"
import { EdgeSVG, EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";
import { SignalSVG } from "./SignalSVG";
import { Signal } from "Editor/Model/ContBlocks/Signal";
import { ContBlockSimulationParamsEdit } from "./ContBlockSimulationParamsEdit";
import { EmptyComponent } from "../Utilities/UtilMethodsAndTypes";
import { ConstantEdit } from "./ConstantEdit";
import { GainEdit } from "./GaintEdit";
import { IntegratorSVG } from "./IntegratorSVG";
import { IntegratorEdit } from "./IntegratorEdit";
import { IntegratorStatistics } from "./IntegratorStatistics";
import { Time } from "Editor/Model/ContBlocks/Time";
import { TimeSVG } from "./TimeSVG";
import { DefaultContBlockEdit } from "./DefaultContBlockEdit";
import { NothingToShowWindow } from "../StatisticsWindow";


/**
 * Továrna pro konstrukci GUI komponent Spojitých bloků.
 */
export class ContBlocksGUIComponentFactory implements IObjectGUIComponentFactory {
    /**
     * @inheritdoc
     */
    getElement (object : IEditorObject): GUIComponents  {
        switch(object.className) {
            case Div.className:
                return {SVGComponent: DivSVG, EditComponent : DefaultContBlockEdit, StatisticsComponent : NothingToShowWindow};
            case Add.className:
                return {SVGComponent: AddSVG, EditComponent :DefaultContBlockEdit, StatisticsComponent : NothingToShowWindow};
            case Sub.className:
                return {SVGComponent: SubSVG, EditComponent : DefaultContBlockEdit, StatisticsComponent : NothingToShowWindow};
            case Mul.className:
                return {SVGComponent: MulSVG, EditComponent : DefaultContBlockEdit, StatisticsComponent : NothingToShowWindow};
            case Constant.className:
                return {SVGComponent: ConstantSVG, EditComponent : ConstantEdit, StatisticsComponent : NothingToShowWindow};
            case Gain.className:
                return {SVGComponent: GainSVG, EditComponent : GainEdit, StatisticsComponent : NothingToShowWindow};
            case Signal.className:
                    return {SVGComponent: SignalSVG, EditComponent : EmptyComponent, StatisticsComponent : NothingToShowWindow};
            case Integrator.className:
                    return {SVGComponent: IntegratorSVG, EditComponent : IntegratorEdit, StatisticsComponent: IntegratorStatistics};
            case Time.className:
                    return {SVGComponent: TimeSVG, EditComponent : DefaultContBlockEdit, StatisticsComponent : NothingToShowWindow};
            default:
                throw new Error("Couldnt find SVG component for given object");
        }
    }

    getSimulationParamsEdit(): FunctionComponent<{}> {
        return ContBlockSimulationParamsEdit;
    }
}