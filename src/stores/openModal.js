import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    modalIsOpen:false,
}

const openModals = createSlice({
    name:'modals',
    initialState,
    reducers:{
        Modalopen:(state,action)=>{
            state.modalIsOpen=action.payload
        },
        Modalclose:(state,action)=>{
            state.modalIsOpen=action.payload
        }

    }

})

export const {Modalopen,Modalclose,getFAnames} = openModals.actions;
export default openModals.reducer;