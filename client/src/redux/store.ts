import {Store, Reducer} from 'redux'
import {configureStore} from "@reduxjs/toolkit";
import {loginReducer} from "./slices/loginSlice.ts";
import {registerReducer} from "./slices/registerSlice.ts";

type RootReducer = {
	login: Reducer,
	register: Reducer,
	// chatReducer: Reducer
}


const rootReducer: RootReducer = {
	login: loginReducer,
	register: registerReducer
}


export const store : Store = configureStore({
	reducer: rootReducer,

})