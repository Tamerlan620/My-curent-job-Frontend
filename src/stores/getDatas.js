import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    nameofFA:[],
    AddedFA:[],
    Consolidation:[],
    FA_in_Overhead:[],
    FA_from_subsidiary:[],

    ChosenID:[],
    OverheadChosenID:[],
    ConsolidationChosenID:[],
    isLoading:true,
    getSubsidiary:null,

}

export const Get_Bought_FA = createAsyncThunk('/addfixedassets',async ()=>{
    try {
        const {data} = await axios.get("http://localhost:4444/new");
        return data
    }catch(err){
        await console.log(err)
    }
})


export const Get_Fixed_Asset_Name = createAsyncThunk('/getfixedassetsName',async ()=>{
    try {
        const {data} = await axios.get("http://localhost:4444/addFixedAssetName");
        return data
    }catch(err){
        await console.log(err)
    }
})


export const Get_Added_Fixed_Asset = createAsyncThunk('/getaddFixedAssets',async ()=>{
    try {
        const {data} = await axios.get("http://localhost:4444/addFixedAssets");
        return data
    }catch(err){
        await console.log(err)
    }
})


export const Get_CONSALLIDATION = createAsyncThunk('/getconsolidation',async ()=>{
    try {
        const {data} = await axios.get("http://localhost:4444/consolidation");
        return data
    }catch(err){
        await console.log(err)
    }
})

export const Get_Subs = createAsyncThunk('/getreports',async ()=>{
    try {
        const {data} = await axios.get("http://localhost:4444/reports");
        return data
    }catch(err){
        await console.log(err)
    }
})


const getDatas = createSlice({
    name:'datas',
    initialState,
    reducers:{

      Get_ID_FA : (state,action)=>{
                state.ChosenID = action.payload
            },
      Get_ID_Overhead : (state,action)=>{
                state.OverheadChosenID = action.payload
            },
      Get_Subsidiary : (state,action)=>{
                state.getSubsidiary = action.payload
      },
      Get_ID_Consolidation : (state,action)=>{
        state.ConsolidationChosenID = action.payload
      },
    },
    extraReducers:{
        [Get_Bought_FA.pending]:(state)=>{
            state.isLoading=true
        },
        [Get_Bought_FA.fulfilled]:(state,action)=>{
            state.FA_in_Overhead=action.payload
        },
        [Get_Bought_FA.rejected]:(state)=>{
            state.isLoading=false
        },
// -----------------------------------------------------------------------------------------------
        [Get_Fixed_Asset_Name.pending]:(state)=>{
            state.isLoading=true
        },
        [Get_Fixed_Asset_Name.fulfilled]:(state,action)=>{
            state.nameofFA=action.payload
        },
        [Get_Fixed_Asset_Name.rejected]:(state)=>{
            state.isLoading=false
        },
// -----------------------------------------------------------------------------------------------
        [Get_Added_Fixed_Asset.pending]:(state)=>{
            state.isLoading=true
        },
        [Get_Added_Fixed_Asset.fulfilled]:(state,action)=>{
            state.AddedFA=action.payload
        },
        [Get_Added_Fixed_Asset.rejected]:(state)=>{
            state.isLoading=false
        },
// -----------------------------------------------------------------------------------------------
        [Get_CONSALLIDATION.pending]:(state)=>{
            state.isLoading=true
        },
        [Get_CONSALLIDATION.fulfilled]:(state,action)=>{
            state.Consolidation=action.payload
        },
        [Get_CONSALLIDATION.rejected]:(state)=>{
            state.isLoading=false
        },

// -----------------------------------------------------------------------------------------------
        [Get_Subs.pending]:(state)=>{
            state.isLoading=true
        },
        [Get_Subs.fulfilled]:(state,action)=>{
            state.FA_from_subsidiary=action.payload
        },
        [Get_Subs.rejected]:(state)=>{
            state.isLoading=false
        }
    }

})

export const {getFAnames,getAddedFA,getConsolidation,Get_ID_FA,Get_ID_Overhead,FAinOverhead,Get_Subsidiary,Get_ID_Consolidation} = getDatas.actions;
export default getDatas.reducer;