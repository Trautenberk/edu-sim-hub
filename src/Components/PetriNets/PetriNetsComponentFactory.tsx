import { PlaceSVG } from "Components/PetriNets/PlaceSVG";
import { TransitionSVG } from "Components/PetriNets/TransitionSVG";
import { ICanvasElementFactory } from "Components/CanvasComponentFactory";
import { Place } from "../../Model/PetriNets/Place";
import { Transition } from "../../Model/PetriNets/Transition";
import { ISimObject } from "Model/SimObject";
import { FunctionComponent } from "react";
import { ObjectSVGProps } from "Components/Editor/Canvas";


type AAA = {

}
export class PetriNetsComponentFactory implements ICanvasElementFactory {
    getElement (object : ISimObject): FunctionComponent<ObjectSVGProps>  {
        switch(object.typeName) {
            case Place.name:
                return PlaceSVG;
            case Transition.name:
                return  TransitionSVG;
            default:
                throw new Error("Tempory error");
        }
    }
}