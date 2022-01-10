import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store/Store";

type ElementSelectionState = {
    selectedElementID: string | null;
}

const initialState : ElementSelectionState = {
    selectedElementID : null
}

const elementSelectionSlice = createSlice({
    name : "SelectedElement", 
    initialState,
    reducers: {
        select(state, action : PayloadAction<string>) {
            state.selectedElementID = action.payload;
        },
        deselect(state) {
            state.selectedElementID = null;
        }     
    }
})

export const selectSelectedElementID = (state : RootState) => state.selectedElement.selectedElementID;

export const {select, deselect} = elementSelectionSlice.actions;
export default elementSelectionSlice.reducer;
