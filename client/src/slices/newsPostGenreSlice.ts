import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { NewsPostGenre } from "../types/common" 
import { v4 as uuidv4 } from "uuid" 
import { modalTypes } from "../components/Modal"
import { logout } from "./authSlice"

interface NewsPostGenreState {
	newsPostGenres: Array<NewsPostGenre> 
}

const initialState: NewsPostGenreState = {
	newsPostGenres: []
}

export const newsPostGenreSlice = createSlice({
	name: "newsPostGenre",
	initialState,
	reducers: {
		setNewsPostGenres(state, action:PayloadAction<Array<NewsPostGenre>>){
			state.newsPostGenres = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setNewsPostGenres
} = newsPostGenreSlice.actions
export const newsPostGenreReducer = newsPostGenreSlice.reducer 