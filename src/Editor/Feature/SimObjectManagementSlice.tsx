import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEditorObject } from "Editor/Model/EditorObject";


type SimObjectManagementState = {
    objects : {[id : string] : IEditorObject}
}

const initialState : SimObjectManagementState = {
    objects : {}
}


const simObjectManagementSlice = createSlice({
    name : "SimObjectManagement",
    initialState,
    reducers: {
        addObject (state, action : PayloadAction<IEditorObject>) {
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
        },
        changeObject (state, action : PayloadAction<IEditorObject>) {
            const obj = action.payload;
            state.objects[obj.id] = obj;
        }

    }
})


export const {addObject, removeAllObjects, removeObject, changeObject} = simObjectManagementSlice.actions;
export default simObjectManagementSlice.reducer;