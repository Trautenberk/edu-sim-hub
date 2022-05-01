import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";
import { FC } from "react";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { DiscreteGraph } from "../Utilities/UtilComponents/DiscreteGraph";



export  const TransitionStatistics : FC<StatisticsComponentProps> = (props) => {

    const values = (props.statistics as IPetriNetsStatistics).transitionRecords[props.id];

    return (
        <div>
            <p>Statistiky přechodu: {props.id}</p>
            <div >
                <DiscreteGraph  data={values} xKey={"time"} yKey={"fired"}  />
            </div>
        </div>
    )
  }

