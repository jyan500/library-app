import { createStore } from "redux"
import { configureStore } from "@reduxjs/toolkit" 
import { navReducer }  from "./slices/navSlice"
import { authReducer } from "./slices/authSlice" 
import { toastReducer } from "./slices/toastSlice" 
import { userProfileReducer }  from "./slices/userProfileSlice"
import { modalReducer } from "./slices/modalSlice" 
import { userRoleReducer } from "./slices/userRoleSlice" 
import { bookReducer } from "./slices/bookSlice"
import { newsPostReducer } from "./slices/newsPostSlice" 
import { genreReducer } from "./slices/genreSlice" 
import { newsPostGenreReducer } from "./slices/newsPostGenreSlice"
import { publicApi } from "./services/public"
import { privateApi } from "./services/private"
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger'

const persistConfig = {
	key: "root",
	version: 1,
	storage,
}

export const store = configureStore({
	reducer: {
		[publicApi.reducerPath]: publicApi.reducer,
		[privateApi.reducerPath]: privateApi.reducer,
		"auth": authReducer,
		"nav": navReducer,
		"userProfile": userProfileReducer,
		"toast": toastReducer,
		"modal": modalReducer,
		"userRole": userRoleReducer,
		"book": bookReducer,
		"newsPost": newsPostReducer,
		"genre": genreReducer,
		"newsPostGenre": newsPostGenreReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		},
	}).concat(logger)
	.concat(publicApi.middleware)
	.concat(privateApi.middleware)
})


// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const persistor = persistStore(store)



