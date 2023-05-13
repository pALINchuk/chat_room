import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Reducer} from "redux";


type InitialState = {
	username: string,
	password: string,
	registerReq:{
		status: string | null
		error: string | null
		errorCode: string | null
	}
}

type AttemptRegisterParams = {
	username: string,
	password: string
}

const initialState: InitialState = {
	username: '',
	password: '',
	registerReq:{
		status: null,
		error: null,
		errorCode: null
	}
}



export const attemptRegister = createAsyncThunk(
	"register/attempt",
	async (params: AttemptRegisterParams, {rejectWithValue}) =>{
		const {username, password}:AttemptRegisterParams = params;
		try{
			//request
			return {};
		}catch(err: any){
			//error handling
			return rejectWithValue(err.message)
		}
	}
)

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
	},
	extraReducers: builder => {
		builder
			.addCase(attemptRegister.pending, (state: InitialState, action)=>{
				state.registerReq.status = "pending"
			})
			.addCase(attemptRegister.fulfilled, (state: InitialState, action)=>{
				state.registerReq.status = "resolved"
			})
			.addCase(attemptRegister.rejected, (state: InitialState, action)=>{
				state.registerReq.status = "rejected"
			})
	}
})

export const registerReducer: Reducer<InitialState> = registerSlice.reducer;
export const {updateUsername, updatePassword, clearState} = registerSlice.actions;