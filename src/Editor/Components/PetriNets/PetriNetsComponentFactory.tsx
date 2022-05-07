import { GUIComponents, IObjectGUIComponentFactory } from "Editor/Components/ObjectGUIComponentFactory";
import { Place, Transition, InputArc, OutputArc } from "Editor/Model/PetriNets";
import { IEditorObject } from "Editor/Model/EditorObject";
import { PlaceSVG, PlaceEdit, TransitionSVG, TransitionEdit, ArcSVG } from "./"
import { FC, FunctionComponent } from "react";
import { EdgeSVGComponentProps } from "../Utilities/UtilComponents/EdgeSVG";
import { ArcEdit } from "./ArcEdit";
import { PetriNetsSimulationParamsEdit } from "./PetriNetsSimulationParamsEdit";
import { PlaceStatistics } from "./PlaceStatistics";
import { TransitionStatistics } from "./TransitionStatistics";
import { EmptyComponent } from "../Utilities/UtilMethodsAndTypes";


/**
 * Továrna pro konstrukci GUI komponent Petriho Sítě
 */
export class PetriNetsGUIComponentFactory implements IObjectGUIComponentFactory {

    /**
     * Tovární funcke příjímá objekt a podle jeho classname vrací objekt obsahující GUI komponenty
     * pro jednotlivá okna.
     * @param object Vstupní objekt
     * @returns Objekt obsahující požadované GUI komponenty.
     */
    getElement (object : IEditorObject): GUIComponents  {
        switch(object.className) {
            case Place.className:
                return {SVGComponent : PlaceSVG, EditComponent : PlaceEdit, StatisticsComponent : PlaceStatistics};
            case Transition.className:
                return  {SVGComponent: TransitionSVG, EditComponent : TransitionEdit, StatisticsComponent : TransitionStatistics};
            case InputArc.className:
                return {SVGComponent: ArcSVG, EditComponent: ArcEdit, StatisticsComponent : EmptyComponent}
            case OutputArc.className:
                    return {SVGComponent: ArcSVG, EditComponent: ArcEdit, StatisticsComponent : EmptyComponent}
            default:
                throw new Error(`Couldnt find SVG component for given object with className: ${object.className}`);
        }
    }

    /**
     * 
     * @returns Vrací komponentu pro editaci parametrů simulace.
     */
    getSimulationParamsEdit(): FunctionComponent<{}> {
       return PetriNetsSimulationParamsEdit; 
    }
}