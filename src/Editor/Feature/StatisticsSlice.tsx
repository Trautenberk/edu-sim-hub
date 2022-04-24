import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPetriNetsStatistics } from "Editor/Model/PetriNets/PetriNetsSimulatorAdapter";


type StatisticsState = {
    petriNets: IPetriNetsStatistics | null,
}

const initialState : StatisticsState = {
    petriNets : null,

}

const statisticsSlice = createSlice({
    name: "StatisticsSlice",
    initialState,
    reducers : {
        setStatistics(state , action : PayloadAction<IPetriNetsStatistics>) {
            state.petriNets = action.payload;
        }
    }
})


export const {
    setStatistics
} = statisticsSlice.actions;

export default statisticsSlice.reducer;