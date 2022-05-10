import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";
import { FC } from "react";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { DiscreteGraph } from "../Utilities/UtilComponents/DiscreteGraph";



/**
 * React komponenta pro zobrazení statistik přechodu získaných v průběhu simulace.
 * @param props Struktura statistik obsahující kolekci hodnot a klíče pro osy grafu 
 * @returns React komponenta okna statistik
 */
export  const TransitionStatistics : FC<StatisticsComponentProps> = (props) => {

    const values = (props.statistics as IPetriNetsStatistics).transitionRecords[props.id];

    return (
        <div>
            <p>Graf kolikrát byl přechod proveden v čase: {props.id}</p>
            <div >
                <DiscreteGraph  data={values} xKey={"time"} yKey={"fired"} xLabel="Modelový čas" yLabel="Počet provedení"  />
            </div>
        </div>
    )
  }

