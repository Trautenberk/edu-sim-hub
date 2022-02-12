import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "Store/Store";


export const MAX_SCALE : number = 5;
export const MIN_SCALE : number = 0.15; 

export type zoomPayload = {
    deltaY : number
}
type ZoomState = {
    currentZoomScale : number
}

const initialState : ZoomState = {
    currentZoomScale : 1
}

const zoomSlice = createSlice({
    name : "Zoom",
    initialState,
    reducers : {
        zoom(state, action : PayloadAction<zoomPayload>){
            const currentScale = state.currentZoomScale;
            let scaleStep = action.payload.deltaY < 0 ? 1.25 : 0.8;
    
            if (currentScale * scaleStep > MAX_SCALE) {
                scaleStep = MAX_SCALE / currentScale;
            }
            
            if (currentScale * scaleStep < MIN_SCALE) {
                scaleStep = MIN_SCALE / currentScale;
            }
    
            state.currentZoomScale = currentScale * scaleStep;
        }
    }
})
export const selelctCurrentZoom = (state : RootState) => state.zoom.currentZoomScale;
export const {zoom} = zoomSlice.actions;
export default zoomSlice.reducer;