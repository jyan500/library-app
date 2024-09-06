import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { Book } from "../types/common" 
import { logout } from "./authSlice"

interface BookState {
	books: Array<Book> 
}

const initialState: BookState = {
	books: []
}

export const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {
		setBooks(state, action:PayloadAction<Array<Book>>){
			state.books = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setBooks
} = bookSlice.actions
export const bookReducer = bookSlice.reducer 