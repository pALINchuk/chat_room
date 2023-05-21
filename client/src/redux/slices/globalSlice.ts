import {createAsyncThunk, createSlice, Slice} from "@reduxjs/toolkit";
import {Reducer} from "redux";


const API_ISAUTH_URL = 'http://localhost:3000/isAuthorized'

export const checkAuth = createAsyncThunk(
	"global/checkAuth",
	async (_, {rejectWithValue}) =>{
		try{
			const response = await fetch(API_ISAUTH_URL, {
				credentials: 'include',
				method: 'GET'
			})
			const data = await response.json()
			if (data.isAuth == undefined){
				return rejectWithValue("no authorization data from the server")
			}
			return data
		}catch (e: any){
			return rejectWithValue(e?.message ?? "unknown error")
		}
	}
)





type InitialState = {
	isAuth: boolean
	userId: string
	loading: boolean
}

const initialState = {
	isAuth: false,
	userId: '',
	loading: true
}

const globalSlice:Slice<InitialState> = createSlice({
	name: 'global',
	initialState,
	reducers:{
		updateIsAuth(state: InitialState, action: {type: string, payload: boolean}) : InitialState{
			state.isAuth = action.payload
			return state
		},
		updateUserId(state: InitialState, action: {type: string, payload: string}) : InitialState{
			state.userId = action.payload
			return state
		},
		updateLoading(state: InitialState, action: {type: string, payload: boolean}) : InitialState{
			state.loading = action.payload
			return state
		},
		clearState(state: InitialState, action: {type: string}){
			return initialState
		}
	},
	extraReducers: builder => {
		builder
			.addCase(checkAuth.fulfilled, (state, action)=>{
				state.isAuth = action.payload.isAuth
				state.userId = action.payload.user?.userId

				state.loading = false
			})
			.addCase(checkAuth.pending, (state, action)=>{
				state.loading = true
			})
	}

})


export const {updateIsAuth, updateUserId, clearState} = globalSlice.actions;

export const globalReducer: Reducer<InitialState> = globalSlice.reducer;
