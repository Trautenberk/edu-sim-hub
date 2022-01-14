import {configureStore} from "@reduxjs/toolkit"
import elementSelectionReducer from "../Feature/ElementSelectionSlice"
import zoomReducer from "Feature/ZoomSlice"
import canvasContextReducer from "Feature/CanvasContextSlice"

export const store = configureStore({
    reducer: {
        selectedElement : elementSelectionReducer,
        zoom : zoomReducer,
        canvasContext : canvasContextReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;