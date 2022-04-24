import {configureStore} from "@reduxjs/toolkit"
import zoomReducer from "../Feature/ZoomSlice"
import canvasContextReducer from "../Feature/CanvasContextSlice"
import simObjectManagementRedcer from "../Feature/SimObjectManagementSlice"
import statisticsReducer from "../Feature/StatisticsSlice"

export const store = configureStore({
    reducer: {
        zoom : zoomReducer,
        canvasContext : canvasContextReducer,
        simObjectManagement : simObjectManagementRedcer,
        statistics : statisticsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;