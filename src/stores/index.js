import {configureStore} from "@reduxjs/toolkit";
import openModal from "./openModal";
import getDatas from "./getDatas";


const store =configureStore({
    reducer:{
        openModal,
        getDatas
    }
})


export default store;