import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContBlockStatistics, IPetriNetsStatistics } from "Editor/Adapters";


type StatisticsState = {
    statistics: IPetriNetsStatistics | IContBlockStatistics | null,
}

const initialState : StatisticsState = {
    statistics : null,

}

// Řez pro správu statistik
const statisticsSlice = createSlice({
    name: "StatisticsSlice",
    initialState,
    reducers : {
        // Nastaví objekt statistik
        setStatistics(state , action : PayloadAction<IPetriNetsStatistics | IContBlockStatistics>) {
            state.statistics = action.payload;
        },
        // Smaže objekt statistik
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