import { PlaceSVG } from "Components/PetriNets/PlaceSVG";
import { TransitionSVG } from "Components/PetriNets/TransitionSVG";
import { ICanvasElementFactory } from "Components/CanvasComponentFactory";
import { Place } from "../../Model/PetriNets/Place";
import { Transition } from "../../Model/PetriNets/Transition";
import { SimObject } from "Model/SimObject";
import { FunctionComponent } from "react";
import { CanvasElementProps } from "Components/Editor/Canvas";


export class PetriNetsComponentFactory implements ICanvasElementFactory {
    getElement (object : SimObject): FunctionComponent<CanvasElementProps>  {
        switch(object.constructor) {
            case Place:
                return PlaceSVG;
            case Transition:
                return  TransitionSVG;
            default:
                throw new Error("Tempory error");
        }
    }
}