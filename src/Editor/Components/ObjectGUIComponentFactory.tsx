import { FunctionComponent } from "react";
import { IEditorObject } from "../Model/EditorObject";
import { ObjectEditProps, ObjectSVGProps } from "App";
import { EdgeSVGComponentProps } from "./Utilities/UtilComponents/EdgeSVG";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";
import { IContBlockStatistics } from "./ContBlocks/ContBlocksAdapter";


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
    getElement(object : IEditorObject) : GUIComponents;
    getSimulationParamsEdit() : FunctionComponent;
}
