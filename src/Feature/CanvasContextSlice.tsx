import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { Boundaries } from "Components/Utilities/UtilMethodsAndTypes";
import { RootState } from "Store/Store";

const INIT_POS_OFFSET_X = 50;
const INIT_POS_OFFSET_Y = 50 

type CanvasContextState = {
    canvasBoundaries : Boundaries,
    initPos : ICoordinates,
}

const initialState : CanvasContextState = {
    canvasBoundaries : { left : 0, top: 0 },
    initPos : { x : INIT_POS_OFFSET_X, y : INIT_POS_OFFSET_Y },
}

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