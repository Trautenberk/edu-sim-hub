import { FunctionComponent } from "react";
import { IEditorObject } from "../Model/EditorObject";
import { ObjectEditProps, ObjectSVGProps } from "App";
import { IContBlockStatistics } from "../Adapters/ContBlocksAdapter";
import { IPetriNetsStatistics } from "Editor/Adapters";


export type StatisticsComponentProps = {
    id : string;
    statistics: IPetriNetsStatistics | IContBlockStatistics
}

export type GUIComponents = {
    SVGComponent : FunctionComponent<ObjectSVGProps>
    EditComponent : FunctionComponent<ObjectEditProps>;
    StatisticsComponent : FunctionComponent<StatisticsComponentProps>;
}

export interface IObjectGUIComponentFactory {
    /**
     * Tovární funcke příjímá objekt a podle jeho classname vrací objekt obsahující GUI komponenty
     * pro jednotlivá okna.
     * @param object Vstupní objekt
     * @returns Objekt obsahující požadované GUI komponenty.
     */
    getElement(object : IEditorObject) : GUIComponents;
    getSimulationParamsEdit() : FunctionComponent;
}
