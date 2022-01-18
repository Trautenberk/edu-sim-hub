import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotImplementedException } from "Components/Utilities/Errors";
import { Coordinates, PointBriefDesc } from "Components/Utilities/UtilMethodsAndTypes";
import { stat } from "fs";
import { RootState } from "Store/Store";


enum ConnectionState {
    beginConnectingPhase,
    endConnectingPhase,
}


type PointConnectionState = {
    connectingState :  ConnectionState,   // stav aparátu spojování
    endPoints : {[id : string] : Coordinates}  // koncove body
    connectionPoints : {[id : string] : Coordinates}  // body na spojnici koncovych bodu
    startingEndPoint : string | null,
    selectedElementID: string | null;
    selectedEndPoint : string | null;
}

const initialState : PointConnectionState = {
    connectingState : ConnectionState.beginConnectingPhase,
    endPoints: {},
    connectionPoints: {},
    startingEndPoint: null,
    selectedElementID : null,
    selectedEndPoint :  null,
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
        },
        // registrace endPointu
        registerEndPoint(state, action : PayloadAction<PointBriefDesc>){
            const {id, coords} = action.payload;
            if (Object.keys(state.endPoints).includes(id)) {
                throw new Error(`Registering already registered endpoitn ${id} `)
            } else {
                state.endPoints = {...state.endPoints, id : coords};
            }
        },
        // odregistrování endPointu
        unregisterEndPoint(state, action : PayloadAction<string>){
            if(Object.keys(state.endPoints).includes(action.payload)){
                delete state.endPoints[action.payload];
            }
            else{
                console.warn(`Couldnt find endPoint: ${action.payload} to unregister, endPoints: ${JSON.stringify(state.endPoints)}`)
            }
        },
        // aktualizace souřadnic endPointu
        updateEndPointCoords(state, action : PayloadAction<PointBriefDesc>){
            if(Object.keys(state.endPoints).includes(action.payload.id)){   // pokud slovnik obsahuje endPoint s přijatým id
                state.endPoints[action.payload.id] = action.payload.coords;  // provede update
            } else {
                console.error(`update of nonexisting endPoint ${action.payload.id}`);
            }
        },
        // kliknuto na plochu 
        gridClicked(state, action : PayloadAction<Coordinates>){
            if(state.selectedElementID != null && state.selectedEndPoint == null){
                state.selectedElementID = null;
                return;
            }
            if(state.selectedElementID != null && state.selectedEndPoint != null) {
                if ( Object.keys(state.endPoints).length === 1 ){   
                    // TODO dodelat messageBox a vypsat hlasku
                    console.warn("no other endpoints to connect to");
                    state.selectedElementID = null;
                    state.selectedEndPoint = null;
                    return;
                } else {
                    // TODO zacit spojovat
                }
            }      
        }
    },
})


export const selectedElementID = (state : RootState) => state.pointConnectionAndSelection.selectedElementID;
export const selectedEndPoint = (state : RootState) => state.pointConnectionAndSelection.selectedEndPoint;
export const {endPointClicked, gridClicked, registerEndPoint, unregisterEndPoint, updateEndPointCoords, elementClicked} = pointConnectionSlice.actions
export default pointConnectionSlice.reducer;