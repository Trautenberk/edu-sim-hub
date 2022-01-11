import {configureStore} from "@reduxjs/toolkit"
import elementSelectionReducer from "../Feature/ElementSelectionSlice"
import zoomReducer from "Feature/ZoomSlice"

export const store = configureStore({
    reducer: {
        selectedElement : elementSelectionReducer,
        zoomReducer : zoomReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;