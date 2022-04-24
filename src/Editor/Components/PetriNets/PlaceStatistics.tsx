import { NULL_OBJ_ID } from "Editor/Model/EditorObject";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";
import { FC } from "react";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { StatisticsComponentProps } from "../ObjectGUIComponentFactory";
import { useStoreHooks } from "../Utilities/CustomHooks";


export const PlaceStatistics : FC<StatisticsComponentProps> = (props) => {
        
    const values = props.statistics.placeRecords[props.id];

    return (
        <div>
            <p>Place record</p>
            <div className="line-chart-wrapper">
                <LineChart
                    width={700} height={700} data={values}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis dataKey="time" />
                    <YAxis type="number" />
                    <Tooltip />
                    <Line type="stepAfter" dataKey="tokens" stroke="#ff7300" />
                </LineChart>
            </div>
        </div>
    )
  }