import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type StatisticsState = {
    statistics: any
}

const initialState : StatisticsState = {
 statistics : {}
}

const statisticsSlice = createSlice({
    name: "StatisticsSlice",
    initialState,
    reducers : {
        setStatistics(state , action : PayloadAction<any>) {
            state.statistics = action.payload;
        }
    }
})


export const {
    setStatistics
} = statisticsSlice.actions;

export default statisticsSlice.reducer;