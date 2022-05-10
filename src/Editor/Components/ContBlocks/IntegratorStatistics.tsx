import { FC } from "react";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { ContGraph } from "../Utilities/UtilComponents/ContGraph";
import { IContBlockStatistics } from "./ContBlocksAdapter";


/**
 * React komponenta pro zobrazení statistik Integrátoru
 * @param props 
 * @returns React komponenta editačního okna
 */
export const IntegratorStatistics : FC<StatisticsComponentProps> = (props) => {
        
    const values = (props.statistics as IContBlockStatistics).integratorRecords[props.id];

    return (
        <div>
            <p>Graf hodnoty stavové proměnné v čase pro integrátor : {props.id}</p>
            <div>
                <ContGraph data={values} xKey={"time"} yKey={"value"} xLabel="Modelový čas" yLabel="Hodnota stavové proměnné" />
            </div>
        </div>
    )
  }
