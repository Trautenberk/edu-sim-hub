import { setSimulationParams } from "Editor/Feature/SimObjectManagementSlice";
import { IPNSimulationParams } from "Editor/Model/SimulationParams";
import { FC } from "react"
import { checkMinValueAndSetDefault } from "../Utilities";
import { useStoreHooks } from "../Utilities/CustomHooks";

/**
 * React komponenta pro editaci parametrů simulace Petriho sítě
 * @returns React kompoenta pro editační okno
 */
export const PetriNetsSimulationParamsEdit  : FC = () => {
    const { dispatch, useSelector } = useStoreHooks();

    const params = {...useSelector(state => state.simObjectManagement.simulationParams)} as IPNSimulationParams;

    const onEndTimeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        params.endTime = parseInt(e.currentTarget.value);
        dispatch(setSimulationParams(params));
    }

    return (
        <div>
            <p> Parametry simulace: </p>
            <div>
                <label>Čas konce simulace: </label>
                <input value={params.endTime} type="number" min={1} max={Number.MAX_SAFE_INTEGER} onChange={onEndTimeChange}></input>        
            </div>
        </div>
    )
}

