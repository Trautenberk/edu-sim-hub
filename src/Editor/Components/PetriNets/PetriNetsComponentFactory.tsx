import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { Place, Transition, Arch, InputArch, OutputArch } from "Editor/Model/PetriNets";
import { IEditorObject } from "Editor/Model/EditorObject";
import { PlaceSVG, PlaceEdit, TransitionSVG, TransitionEdit, ArchSVG } from "./"
import { FC, FunctionComponent } from "react";
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";
import { ArchEdit } from "./ArchEdit";
import { PetriNetsSimulationParamsEdit } from "./PetriNetsSimulationParamsEdit";


const emptyComponent : FC = () => {
    return (<></>)

}   // TODO vyhodit

export class PetriNetsGUIComponentFactory implements IObjectGUIComponentFactory {
    getEdgeGUI(): FunctionComponent<EdgeSVGComponentProps> {
        return ArchSVG;
    }

    getElement (object : IEditorObject): GUIComponents  {
        switch(object.className) {
            case Place.name:
                return {SVGComponent : PlaceSVG, EditComponent : PlaceEdit};
            case Transition.name:
                return  {SVGComponent: TransitionSVG, EditComponent : TransitionEdit};
            case InputArch.name:
                return {SVGComponent: ArchSVG, EditComponent: ArchEdit };
            case OutputArch.name:
                    return {SVGComponent: ArchSVG, EditComponent: ArchEdit }
            default:
                throw new Error("Couldnt find SVG component for given object");
        }
    }

    getSimulationParamsEdit(): FunctionComponent<{}> {
       return PetriNetsSimulationParamsEdit; 
    }
}