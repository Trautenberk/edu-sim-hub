import { PlaceSVG } from "Components/PetriNets/PlaceSVG";
import { TransitionSVG } from "Components/PetriNets/TransitionSVG";
import { GUIComponents, IObjectGUIComponentFactory } from "Components/ObjectGUIComponentFactory";
import { Place } from "../../Model/PetriNets/Place";
import { Transition } from "../../Model/PetriNets/Transition";
import { ISimObject } from "Model/SimObject";
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