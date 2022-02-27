import {configureStore} from "@reduxjs/toolkit"
import zoomReducer from "Feature/ZoomSlice"
import canvasContextReducer from "Feature/CanvasContextSlice"
import pointEdgeSelectionReducer from "Feature/PointEdgeSelectionSlice"
import simObjectManagementRedcer from "Feature/SimObjectManagementSlice"

export const store = configureStore({
    reducer: {
        zoom : zoomReducer,
        canvasContext : canvasContextReducer,
        simObjectManagement : simObjectManagementRedcer,
        pointEdgeSelection : pointEdgeSelectionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;