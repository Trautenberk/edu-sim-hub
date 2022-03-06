import { PlaceSVG } from "Editor/Components/PetriNets/PlaceSVG";
import { TransitionSVG } from "Editor/Components/PetriNets/TransitionSVG";
import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { Place } from "Editor/Model/PetriNets/Place";
import { Transition } from "Editor/Model/PetriNets/Transition";
import { ISimObject } from "Editor/Model/SimObject";
import { PlaceEdit } from "./PlaceEdit";
import { TransitionEdit } from "./TransitionEdit";



export class PetriNetsGUIComponentFactory implements IObjectGUIComponentFactory {
    getElement (object : ISimObject): GUIComponents  {
        switch(object.typeName) {
            case Place.name:
                return {SVGComponent : PlaceSVG, EditComponent : PlaceEdit};
            case Transition.name:
                return  {SVGComponent: TransitionSVG, EditComponent : TransitionEdit};
            default:
                throw new Error("Tempory error");
        }
    }
}