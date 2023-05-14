import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Reducer} from "redux";


type InitialState = {
	username: string,
	password: string,
}


const initialState: InitialState = {
	username: '',
	password: '',
}



const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers:{
		updateUsername: (state: InitialState, action: {payload:string, type:string}): InitialState=>{
			state.username = action.payload;
			return state;
		},
		updatePassword: (state: InitialState, action: {payload:string, type:string}) : InitialState =>{
			state.password = action.payload;
			return state;
		},
		clearState: (state: InitialState, action: {type: string}): InitialState =>{
			return initialState
		}
	}
})

export const registerReducer: Reducer<InitialState> = registerSlice.reducer;
export const {updateUsername, updatePassword, clearState} = registerSlice.actions;