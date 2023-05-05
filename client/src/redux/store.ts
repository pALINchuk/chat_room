import {Store, Reducer} from 'redux'
import {configureStore} from "@reduxjs/toolkit";

type RootReducer = {
	// Login: Reducer,
	// Register: Reducer,
	// chatReducer: Reducer
}


const rootReducer: RootReducer = {
}


export const store : Store = configureStore({
	reducer: rootReducer,

})