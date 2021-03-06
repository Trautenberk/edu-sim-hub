import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, ICoordinates } from "Editor/Model/UtilClasses/Coordinates";
import { Boundaries } from "Editor/Components/Utilities/UtilMethodsAndTypes";
import { RootState } from "Editor/Store/Store";

const INIT_POS_OFFSET_X = 200;
const INIT_POS_OFFSET_Y = 200; 

type CanvasContextState = {
    canvasBoundaries : Boundaries,
    initPos : ICoordinates,
}

// Výchozí hodnota řezu
const initialState : CanvasContextState = {
    canvasBoundaries : { left : 0, top: 0 },
    initPos : { x : INIT_POS_OFFSET_X, y : INIT_POS_OFFSET_Y },
}

/**
 * Řez skladu s názve CanvasContextSlice. 
 * Řez obsahuje objekt s informacemi potřebnými pro kompontenty v hlavní ploše, jako jsou hranice
 * HTML elementu plochy.
 */
const canvasContextSlice = createSlice({
    name : "CanvasContext",
    initialState,
    reducers : {
        updateCanvasBoundaries(state, action : PayloadAction<Boundaries>){
            state.canvasBoundaries = action.payload;
        },
        updateInitPos(state, action: PayloadAction<Coordinates>){
            state.initPos = action.payload;
        }
    }
})

export const selectCanvasBoundaries = (state : RootState) => state.canvasContext.canvasBoundaries;
export const selectInitPos = (state : RootState) => state.canvasContext.initPos;
export const { updateCanvasBoundaries, updateInitPos } = canvasContextSlice.actions;
export default canvasContextSlice.reducer;