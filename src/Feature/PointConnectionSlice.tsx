import { createSlice } from "@reduxjs/toolkit";


enum ConnectionState {
    Idle,
    PointSelected
}


type PointConnectionState = {
    state :  ConnectionState,
}

const initialState : PointConnectionState = {
    state : ConnectionState.Idle
}

const pointConnectionSlice = createSlice({
    name : "PointConnection",
    initialState,
    reducers: {
        test(state) {
            
        }
    },
})