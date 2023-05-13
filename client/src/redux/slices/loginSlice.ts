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

type AttemptLoginParams = {
	username: string,
	password: string
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



export const attemptLogin = createAsyncThunk(
	"login/attempt",
	async (params: AttemptLoginParams, {rejectWithValue}) =>{
		const {username, password}:AttemptLoginParams = params;
		try{
			//request
			return {};
		}catch(err: any){
			//error handling
			return rejectWithValue(err.message)
		}
	}
)

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

	},
	extraReducers: builder => {
		builder
			.addCase(attemptLogin.pending, (state: InitialState, action)=>{
				state.loginReq.status = "pending"
			})
			.addCase(attemptLogin.fulfilled, (state: InitialState, action)=>{
				state.loginReq.status = "resolved"
			})
			.addCase(attemptLogin.rejected, (state: InitialState, action)=>{
				state.loginReq.status = "rejected"
			})
	}
})

export const loginReducer: Reducer<InitialState> = loginSlice.reducer;
export const {updateUsername, updatePassword} = loginSlice.actions;