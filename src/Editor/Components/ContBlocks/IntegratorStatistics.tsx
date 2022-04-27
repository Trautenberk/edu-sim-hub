import { FC } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { IContBlockStatistics } from "./ContBlocksAdapter";


export const IntegratorStatistics : FC<StatisticsComponentProps> = (props) => {
        
    const values = (props.statistics as IContBlockStatistics).integratorRecords[props.id];

    return (
        <div>
            <p>Integrator record</p>
            <div className="line-chart-wrapper">
                <LineChart
                    width={700} height={700} data={values}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="time" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Line type="linear" dataKey="value" stroke="#ff7300" />
                </LineChart>
            </div>
        </div>
    )
  }