import { NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";
import { FC } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line, Area, AreaChart, Brush, CartesianGrid } from "recharts";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { useStoreHooks } from "../Utilities/CustomHooks";
import { DiscreteGraph } from "../Utilities/UtilComponents/DiscreteGraph";


/**
 * React komponenta pro zobrazení statistik místa získaných v průběhu simulace.
 * @param props 
 * @returns React komponenta okna statistik
 */
export const PlaceStatistics : FC<StatisticsComponentProps> = (props) => {
        
    const values = (props.statistics as IPetriNetsStatistics).placeRecords[props.id];

    return (
        <div>
            <p>Statistiky místa: {props.id}</p>
            <div>
                <DiscreteGraph data={values} xKey="time" yKey="tokens" />
            </div>
        </div>
    )
  }