import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { Place, Transition } from "Editor/Model/PetriNets";
import { IEditorObject } from "Editor/Model/EditorObject";
import {PlaceSVG, PlaceEdit, TransitionSVG, TransitionEdit} from "./"

export class PetriNetsGUIComponentFactory implements IObjectGUIComponentFactory {
    getElement (object : IEditorObject): GUIComponents  {
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