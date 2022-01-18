import {configureStore} from "@reduxjs/toolkit"
import zoomReducer from "Feature/ZoomSlice"
import canvasContextReducer from "Feature/CanvasContextSlice"
import pointConnectionReducer from "Feature/PointConnectionAndSelectionSlice"
export const store = configureStore({
    reducer: {
        zoom : zoomReducer,
        canvasContext : canvasContextReducer,
        pointConnectionAndSelection : pointConnectionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;