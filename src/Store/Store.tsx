import {createStore} from "redux"
import {configureStore} from "@reduxjs/toolkit"
import elementSelectionReducer from "../Feature/ElementSelectionSlice"

export const store = configureStore({
    reducer: {
        selectedElement : elementSelectionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;