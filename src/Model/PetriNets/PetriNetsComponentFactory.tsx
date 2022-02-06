import { PlaceSVGComponent } from "Components/PetriNets/PlaceSVGComponent";
import { TransitionSVGComponent } from "Components/PetriNets/TransitionSVGComponent";
import ComponentFactory, { CanvasComponent } from "Model/ComponentFactory";
import uniqid from "uniqid";


export class PetriNetsComponentFactory extends ComponentFactory {
    getElement (type: string): CanvasComponent  {
        const id = this.getElementId(type);
        switch(type) {
            case "Place":
                return {id, element: <PlaceSVGComponent key={uniqid()} id={id}/>} ;
            case "Transition":
                return {id, element : <TransitionSVGComponent key={uniqid()} id={id}/>};
            default:
                throw new Error("Tempory error");
        }
    }

}