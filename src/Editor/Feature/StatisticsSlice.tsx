import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContBlockStatistics } from "Editor/Components/ContBlocks/ContBlocksAdapter";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";


type StatisticsState = {
    petriNets: IPetriNetsStatistics | IContBlockStatistics | null,
}

const initialState : StatisticsState = {
    petriNets : null,

}

const statisticsSlice = createSlice({
    name: "StatisticsSlice",
    initialState,
    reducers : {
        setStatistics(state , action : PayloadAction<IPetriNetsStatistics | IContBlockStatistics>) {
            state.petriNets = action.payload;
        }
    }
})


export const {
    setStatistics
} = statisticsSlice.actions;

export default statisticsSlice.reducer;