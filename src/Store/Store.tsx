import {configureStore} from "@reduxjs/toolkit"
import zoomReducer from "Feature/ZoomSlice"
import canvasContextReducer from "Feature/CanvasContextSlice"
import pointEdgeSelectionReducer from "Feature/PointEdgeSelectionSlice"
export const store = configureStore({
    reducer: {
        zoom : zoomReducer,
        canvasContext : canvasContextReducer,
        pointEdgeSelection : pointEdgeSelectionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;