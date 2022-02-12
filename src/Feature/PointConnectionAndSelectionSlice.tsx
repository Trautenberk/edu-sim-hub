import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates, ICoordinates } from "Components/Utilities/UtilClasses/Coordinates";
import { PointBriefDesc } from "Components/Utilities/UtilMethodsAndTypes";
import { RootState } from "Store/Store";


enum ConnectionState {
    beginConnectingPhase,
    endConnectingPhase,
}


type PointConnectionState = {
    connectingState :  ConnectionState,   // stav aparátu spojování
    hint : boolean,
    endPoints :  string[],  // identifikatory koncovych bodu 
    points : {[id : string] : ICoordinates} // vsechny body
    connections : {[id : string] : undefined[]},   // TODO
    selectedConnection : string | null,
    selectedElementID: string | null,
    selectedEndPoint : string | null,  
}

const initialState : PointConnectionState = {
    connectingState: ConnectionState.beginConnectingPhase,
    hint: false,
    connections: {},
    selectedConnection: null,
    selectedElementID: null,
    selectedEndPoint: null,
    endPoints: [],
    points: {}
}

const pointConnectionSlice = createSlice({
    name : "PointConnectionAndSelection",
    initialState,
    reducers: {
        elementClicked(state, action : PayloadAction<string>) {
            state.selectedElementID = action.payload;
        },
        endPointClicked(state, action : PayloadAction<string>){
            state.selectedEndPoint = action.payload;
            state.hint = true;
        },
        // registrace endPointu
        registerEndPoint(state, action : PayloadAction<PointBriefDesc>){
            const {id, coords} = action.payload;
            if (Object.keys(state.points).includes(id)) {
                throw new Error(`Registering already registered endpoitn ${id} `)
            } else {
                state.points[id] = coords;
                state.endPoints.push(id);
            }
        },
        // odregistrování endPointu
        unregisterEndPoint(state, action : PayloadAction<string>){
            if(Object.keys(state.points).includes(action.payload)){
                delete state.points[action.payload];
                state.endPoints.splice(state.endPoints.indexOf(action.payload))
            }
            else{
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic endPointu
        updatePointCoords(state, action : PayloadAction<PointBriefDesc>){
            if(state.endPoints.includes(action.payload.id)){   // pokud slovnik obsahuje endPoint s přijatým id
                state.points[action.payload.id] = action.payload.coords;  // provede update
            } else {
                // console.error(`update of nonexisting point ${action.payload.id}`); // TODO vyřešit logovani jinak
            }
        },
        // kliknuto na plochu 
        gridClicked(state, action : PayloadAction<ICoordinates>){
            if(state.selectedElementID != null && state.selectedEndPoint == null){
                state.selectedElementID = null;
                return;
            }
            if(state.selectedElementID != null && state.selectedEndPoint != null) {
                state.selectedElementID = null;
                //if ( Object.keys(state.endPoints).length === 1 ){ // TODO dodelat elementy do reduxu   
                // TODO dodelat messageBox a vypsat hlasku
                state.selectedElementID = null;
                state.selectedEndPoint = null;
                state.hint = false;
                return;
                // TODO zacit spojovat
            } else {
                console.warn("Tady by to nemelo dojit");
            }     
        }
    },
})



export const selectedElementID = (state : RootState) => state.pointConnectionAndSelection.selectedElementID;
export const selectedEndPoint = (state : RootState) => state.pointConnectionAndSelection.selectedEndPoint;
export const selectHint = (state : RootState) => state.pointConnectionAndSelection.hint;
export const selectHintStartCoords = (state : RootState) => {   // počáteční souřadnice hintLine
    if (state.pointConnectionAndSelection.selectedEndPoint != null) {
        return state.pointConnectionAndSelection.points[state.pointConnectionAndSelection.selectedEndPoint]
    } else {
        // console.error("NULL_CORDS returned from selector") // TODO taky vyresit lepe
        return new Coordinates();
    } 
}

export const {endPointClicked, gridClicked, registerEndPoint, unregisterEndPoint, updatePointCoords, elementClicked} = pointConnectionSlice.actions
export default pointConnectionSlice.reducer;