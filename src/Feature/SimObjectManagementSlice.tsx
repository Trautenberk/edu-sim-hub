import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISimObject } from "Model/SimObject";


type SimObjectManagementState = {
    objects : {[id : string] : ISimObject}
}

const initialState : SimObjectManagementState = {
    objects : {}
}


const simObjectManagementSlice = createSlice({
    name : "SimObjectManagement",
    initialState,
    reducers: {
        addObject (state, action : PayloadAction<ISimObject>) {
            const object = action.payload;
            if (!Object.keys(state.objects).includes(object.id)) {
                state.objects[object.id] = object
            } else {
                console.error(`Object with id ${object.id} is already in`)
            }
        }, 
        removeObject (state, action: PayloadAction<string>) {   
            const id = action.payload;
            if (Object.keys(state.objects).includes(id)) {
                delete state.objects[id]
            } else {
                console.error(`Trying to remove object with id: ${id} that is not in the dictionary`)
            }

        },
        removeAllObjects (state) {
            state.objects = {}
        }
    }
})


export const {addObject, removeAllObjects, removeObject} = simObjectManagementSlice.actions;
export default simObjectManagementSlice.reducer;