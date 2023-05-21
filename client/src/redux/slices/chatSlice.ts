import {createSlice} from "@reduxjs/toolkit";

type Message = {
	post_on_date: Date,
	text: string,
	userID: string,
	user: string
}


type InitialState = {
	messages: Message[],
	contentValue: string
}

const initialState: InitialState = {
	messages: [],
	contentValue: ''
}



const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers:{
		updateContentValue: (state: InitialState, action: {type: string, payload: string})=>{
			state.contentValue = action.payload;
			return state;
		},
		updateMessages: (state: InitialState, action: {type: string, payload: Message}) =>{
			state.messages.push(action.payload)
			return state
		},
		setMessages: (state: InitialState, action: {type: string, payload: Message[]}) =>{
			state.messages = action.payload
			return state
		}
	}
})



export const {updateContentValue, updateMessages, setMessages} = chatSlice.actions
export const chatReducer = chatSlice.reducer