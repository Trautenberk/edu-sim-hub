import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContBlockStatistics } from "Editor/Components/ContBlocks/ContBlocksAdapter";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";


type StatisticsState = {
    statistics: IPetriNetsStatistics | IContBlockStatistics | null,
}

const initialState : StatisticsState = {
    statistics : null,

}

const statisticsSlice = createSlice({
    name: "StatisticsSlice",
    initialState,
    reducers : {
        setStatistics(state , action : PayloadAction<IPetriNetsStatistics | IContBlockStatistics>) {
            state.statistics = action.payload;
        },
        clearStatistics(state) {
            state.statistics = null;
        }
    }
})


export const {
    setStatistics,
    clearStatistics
} = statisticsSlice.actions;

export default statisticsSlice.reducer;