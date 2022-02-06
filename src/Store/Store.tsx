import {configureStore} from "@reduxjs/toolkit"
import zoomReducer from "Feature/ZoomSlice"
import canvasContextReducer from "Feature/CanvasContextSlice"
import pointConnectionReducer from "Feature/PointConnectionAndSelectionSlice"
import elementManagementReducer from "Feature/CanvasElementManagementSlice"
export const store = configureStore({
    reducer: {
        zoom : zoomReducer,
        canvasContext : canvasContextReducer,
        pointConnectionAndSelection : pointConnectionReducer,
        elementManagement : elementManagementReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;