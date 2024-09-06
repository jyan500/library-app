import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { Library } from "../types/common" 
import { logout } from "./authSlice"

interface LibraryState {
	libraries: Array<Library> 
}

const initialState: LibraryState = {
	libraries: []
}

export const librarySlice = createSlice({
	name: "library",
	initialState,
	reducers: {
		setLibraries(state, action:PayloadAction<Array<Library>>){
			state.libraries = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setLibraries
} = librarySlice.actions
export const libraryReducer = librarySlice.reducer 