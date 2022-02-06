import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotImplementedException } from "Components/Utilities/Errors";
import { IComponentFactory } from "Model/ComponentFactory";
import { ReactElement } from "react";
import { RootState } from "Store/Store";


type ElementManagementState = {
    elements : {[key : string] : ReactElement} 
    elementFactory : IComponentFactory | null,   // TODO je tady ten optional nutný? 
}

const initialState : ElementManagementState = {
    elements : {},
    elementFactory : null,
}


export const  elementManagementSlice = createSlice({
    name: "ElementManagement",
    initialState,
    reducers : {
        registerFactory(state, action : PayloadAction<IComponentFactory>){
            state.elementFactory = action.payload;
        },
        unregisterFactories(state){
            state.elementFactory = null;
        },
        addElement(state, action : PayloadAction<string>){
            if (state.elementFactory != null) {
                const {id, element} = state.elementFactory.getElement(action.payload);
                if (!Object.keys(state.elements).includes(id)) {
                    state.elements[id] = element;
                } else {
                    console.error(`Elements already include element with id ${id}, all elements : ${JSON.stringify(state.elements)}`)
                }
            } else {
                console.error(`Element factory is not registered}`);
            }
        },
        removeElement(state, action : PayloadAction<string>){
            if (Object.keys(state.elements).includes(action.payload)){
                delete state.elements[action.payload];
            } else {
                console.error(`Trying to remove nonexistent element ${action.payload}`)
            }
        },
        clearAllElements(state) {
            state.elements = {};
        }
    }
})

export const selectAllElements = (state : RootState) => (Object.values(state.elementManagement.elements))
export const {addElement, removeElement} = elementManagementSlice.actions
export default elementManagementSlice.reducer;