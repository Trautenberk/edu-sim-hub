import { FC } from "react";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { ContGraph } from "../Utilities/UtilComponents/ContGraph";
import { IContBlockStatistics } from "./ContBlocksAdapter";


export const IntegratorStatistics : FC<StatisticsComponentProps> = (props) => {
        
    const values = (props.statistics as IContBlockStatistics).integratorRecords[props.id];

    return (
        <div>
            <p>Statistiky integrátoru: {props.id}</p>
            <div>
                <ContGraph data={values} xKey={"time"} yKey={"value"} />
            </div>
        </div>
    )
  }
