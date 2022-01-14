import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store/Store";

type ElementSelectionState = {
    selectedElementID: string | null;
    selectedEndPoint : string | null;
}

const initialState : ElementSelectionState = {
    selectedElementID : null,
    selectedEndPoint :  null,
}

const elementSelectionSlice = createSlice({
    name : "SelectedElement", 
    initialState,
    reducers: {
        selectElement(state, action : PayloadAction<string>) {
            state.selectedElementID = action.payload;
        },
        deselectElement(state){
            state.selectedElementID = null;
        },
        deselectAll(state) {
            state.selectedElementID = null;
            state.selectedEndPoint =  null;
        },
        selectEndPoint(state, action : PayloadAction<string>){
            state.selectedEndPoint = action.payload;
        },
        deselectEndPoint(state){
            state.selectedEndPoint = null
        }    
    }
})

export const selectSelectedElementID = (state : RootState) => state.elementSelection.selectedElementID;
export const selectedEndPoint = (state : RootState) => state.elementSelection.selectedEndPoint;

export const {selectElement, deselectElement, deselectAll, selectEndPoint, deselectEndPoint} = elementSelectionSlice.actions;
export default elementSelectionSlice.reducer;
