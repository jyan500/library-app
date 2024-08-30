import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { NewsPost } from "../types/common" 
import { v4 as uuidv4 } from "uuid" 
import { modalTypes } from "../components/Modal"
import { logout } from "./authSlice"

interface NewsPostState {
	newsPosts: Array<NewsPost> 
}

const initialState: NewsPostState = {
	newsPosts: []
}

export const newsPostSlice = createSlice({
	name: "newsPost",
	initialState,
	reducers: {
		setNewsPosts(state, action:PayloadAction<Array<NewsPost>>){
			state.newsPosts = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setNewsPosts
} = newsPostSlice.actions
export const newsPostReducer = newsPostSlice.reducer 