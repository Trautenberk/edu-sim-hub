import { setSimulationParams } from "Editor/Feature/SimObjectManagementSlice";
import { IPNSimulationParams } from "Editor/Model/SimulationParams";
import { FC } from "react"
import { checkMinValueAndSetDefault } from "../Utilities";
import { useStoreHooks } from "../Utilities/CustomHooks";

export const PetriNetsSimulationParamsEdit  : FC = () => {
    const { dispatch, useSelector } = useStoreHooks();

    const params = {...useSelector(state => state.simObjectManagement.simulationParams)} as IPNSimulationParams;

    const onEndTimeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        params.endTime = checkMinValueAndSetDefault(parseInt(e.currentTarget.value));
        dispatch(setSimulationParams(params));
    }

    return (
        <div>
            <p> Parametry simulace pro petriho sítě: </p>
        <div>
            <label>Čas konce simulace: </label>
            <input value={params.endTime} type="number" min={50} max={Number.MAX_SAFE_INTEGER} onChange={onEndTimeChange}></input>        
        </div>
    </div>
    )
}

