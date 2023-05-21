import {Store, Reducer} from 'redux'
import {configureStore} from "@reduxjs/toolkit";
import {loginReducer} from "./slices/loginSlice.ts";
import {registerReducer} from "./slices/registerSlice.ts";
import {globalReducer} from "./slices/globalSlice.ts";
import {chatReducer} from "./slices/chatSlice.ts";

type RootReducer = {
	login: Reducer,
	register: Reducer,
	global: Reducer,
	chat: Reducer
}


const rootReducer: RootReducer = {
	login: loginReducer,
	register: registerReducer,
	global: globalReducer,
	chat: chatReducer
}


const store : Store = configureStore({
	reducer: rootReducer,

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export  {store}