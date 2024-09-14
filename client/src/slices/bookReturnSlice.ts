import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { BookConfirmation } from "../types/common" 
import { logout } from "./authSlice"

interface BookReturnState {
	booksToReturn: Array<BookConfirmation>
}

const initialState: BookReturnState = {
	booksToReturn: []
}

export const bookReturnSlice = createSlice({
	name: "bookReturn",
	initialState,
	reducers: {
		setBooksToReturn(state, action:PayloadAction<Array<BookConfirmation>>){
			state.booksToReturn = action.payload
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setBooksToReturn
} = bookReturnSlice.actions
export const bookReturnReducer = bookReturnSlice.reducer 