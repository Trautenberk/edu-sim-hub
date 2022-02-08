import { PlaceSVGComponent } from "Components/PetriNets/PlaceSVGComponent";
import { TransitionSVGComponent } from "Components/PetriNets/TransitionSVGComponent";
import { ICanvasElementFactory } from "Components/CanvasComponentFactory";
import uniqid from "uniqid";
import { Place } from "../../Model/PetriNets/Place";
import { Transition } from "../../Model/PetriNets/Transition";
import { SimObject } from "Model/SimObject";
import { ReactElement } from "react";


export class PetriNetsComponentFactory implements ICanvasElementFactory {
    getElement (object : SimObject): ReactElement  {
        switch(object.constructor) {
            case Place:
                return <PlaceSVGComponent key={uniqid()} id={object.id}/> ;
            case Transition:
                return  <TransitionSVGComponent key={uniqid()} id={object.id}/>;
            default:
                throw new Error("Tempory error");
        }
    }
}