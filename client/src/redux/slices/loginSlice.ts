import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Reducer} from "redux";


type InitialState = {
	username: string,
	password: string,
	loginReq:{
		status: string | null
		error: string | null
		errorCode: string | null
	}
}


const initialState: InitialState = {
	username: '',
	password: '',
	loginReq:{
		status: null,
		error: null,
		errorCode: null
	}
}




const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers:{
		updateUsername: (state: InitialState, action: {payload:string, type:string}): InitialState=>{
			state.username = action.payload;
			return state;
		},
		updatePassword: (state: InitialState, action: {payload:string, type:string}): InitialState =>{
			state.password = action.payload;
			return state;
		},
		clearState: (state: InitialState, action: {type:string}): InitialState =>{
			return initialState;
		}

	}
})

export const loginReducer: Reducer<InitialState> = loginSlice.reducer;
export const {updateUsername, updatePassword, clearState} = loginSlice.actions;