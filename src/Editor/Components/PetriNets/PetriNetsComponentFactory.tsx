import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { Place, Transition, Arch, InputArch, OutputArch } from "Editor/Model/PetriNets";
import { IEditorObject } from "Editor/Model/EditorObject";
import { PlaceSVG, PlaceEdit, TransitionSVG, TransitionEdit, ArchSVG } from "./"
import { FC, FunctionComponent } from "react";
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";
import { ArchEdit } from "./ArchEdit";
import { PetriNetsSimulationParamsEdit } from "./PetriNetsSimulationParamsEdit";
import { PlaceStatistics } from "./PlaceStatistics";
import { TransitionStatistics } from "./TransitionStatistics";
import { EmptyComponent } from "../Utilities/UtilMethodsAndTypes";



export class PetriNetsGUIComponentFactory implements IObjectGUIComponentFactory {

    getElement (object : IEditorObject): GUIComponents  {
        switch(object.className) {
            case Place.name:
                return {SVGComponent : PlaceSVG, EditComponent : PlaceEdit, StatisticsComponent : PlaceStatistics};
            case Transition.name:
                return  {SVGComponent: TransitionSVG, EditComponent : TransitionEdit, StatisticsComponent : TransitionStatistics};
            case InputArch.name:
                return {SVGComponent: ArchSVG, EditComponent: ArchEdit, StatisticsComponent : EmptyComponent}
            case OutputArch.name:
                    return {SVGComponent: ArchSVG, EditComponent: ArchEdit, StatisticsComponent : EmptyComponent}
            default:
                throw new Error("Couldnt find SVG component for given object");
        }
    }

    getSimulationParamsEdit(): FunctionComponent<{}> {
       return PetriNetsSimulationParamsEdit; 
    }
}