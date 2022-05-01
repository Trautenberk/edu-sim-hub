import { createSlice } from "@reduxjs/toolkit"




type ExamplesState = {
    showMenu : boolean
}

const initialState : ExamplesState = {
    showMenu : false
}


const exampleSlice = createSlice({
  name: "Examples",
  initialState,
  reducers: {
    showMenu(state) {
        state.showMenu = true;
    },
    hideMenu(state, action) {
        state.showMenu = false;
    }
  }  
})