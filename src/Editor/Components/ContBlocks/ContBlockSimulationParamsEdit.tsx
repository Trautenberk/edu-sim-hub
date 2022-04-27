import { setSimulationParams } from "Editor/Feature/SimObjectManagementSlice";
import { IContBlocksSimulationParams } from "Editor/Model/SimulationParams";
import { FC } from "react"
import { checkMinValueAndSetDefault } from "../Utilities";
import { useStoreHooks } from "../Utilities/CustomHooks";

export const ContBlockSimulationParamsEdit  : FC = () => {
    const { dispatch, useSelector } = useStoreHooks();

    const params = {...useSelector(state => state.simObjectManagement.simulationParams)} as IContBlocksSimulationParams;

    const onEndTimeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        params.endTime = parseFloat(e.currentTarget.value);
        dispatch(setSimulationParams(params));
    }

    const onSimStepSizeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        params.simStepSize = parseFloat(e.currentTarget.value);
        dispatch(setSimulationParams(params));
    }

    const onStatisticsIntervalChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        params.statisticsInterval = parseInt(e.currentTarget.value);
        dispatch(setSimulationParams(params));
    }

    return (
        <div>
            <p> Parametry simulace pro spojitá bloková schémata: </p>
        <div>
            <label>Čas konce simulace: </label>
            <input value={params.endTime} type="number" min={1} max={Number.MAX_SAFE_INTEGER} onChange={onEndTimeChange}></input>        
        </div>
        <div>
            <label>Délka kroku simulace:</label>
            <input value={params.simStepSize} type="number" step={0.001} max={Number.MAX_SAFE_INTEGER} onChange={onSimStepSizeChange}></input>        
        </div>
        <div>
            <label>Interval sběru statistik:</label>
            <input value={params.statisticsInterval} type="number" min={1} step={0.001} max={Number.MAX_SAFE_INTEGER} onChange={onStatisticsIntervalChange}></input>        
        </div>
    </div>
    )
}

