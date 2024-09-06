import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { Genre } from "../types/common" 
import { logout } from "./authSlice"

interface GenreState {
	genres: Array<Genre> 
}

const initialState: GenreState = {
	genres: []
}

export const genreSlice = createSlice({
	name: "genre",
	initialState,
	reducers: {
		setGenres(state, action:PayloadAction<Array<Genre>>){
			state.genres = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setGenres
} = genreSlice.actions
export const genreReducer = genreSlice.reducer 