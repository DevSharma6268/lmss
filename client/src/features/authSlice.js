import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false,
    isLoading:false,
    error:null
}


const authSlice =createSlice({
    name:"authSlice",
    initialState,

    reducers:{
        userLoggedIn:(state,action)=> {
            state.user=action.payload;
            state.isAuthenticated=true;
            state.isLoading=false;
            state.error=null;
        },
        userLoggedOut:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.isLoading=false;
            state.error=null;
        },
        userLoginFailed:(state,action)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.isLoading=false;
            state.error=action.payload;
        }
    }

})

export const {userLoggedIn,userLoggedOut,userLoginFailed}=authSlice.actions;
export default authSlice.reducer;
