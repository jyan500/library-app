import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { BookStatus } from "../types/common" 
import { v4 as uuidv4 } from "uuid" 
import { logout } from "./authSlice"

interface BookStatusState {
	bookStatuses: Array<BookStatus> 
}

const initialState: BookStatusState = {
	bookStatuses: []
}

export const bookStatusSlice = createSlice({
	name: "bookStatus",
	initialState,
	reducers: {
		setBookStatuses(state, action:PayloadAction<Array<BookStatus>>){
			state.bookStatuses = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setBookStatuses
} = bookStatusSlice.actions
export const bookStatusReducer = bookStatusSlice.reducer 