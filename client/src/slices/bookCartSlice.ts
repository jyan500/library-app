import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { CartItem } from "../types/common" 
import { logout } from "./authSlice"

interface BookCartState {
	cartItems : Array<CartItem>
}

const initialState: BookCartState = {
	cartItems: []	
}

export const bookCartSlice = createSlice({
	name: "bookCart",
	initialState,
	reducers: {
		setCartItems(state, action:PayloadAction<Array<CartItem>>){
			state.cartItems = action.payload
			localStorage.setItem("cartItems", JSON.stringify(action.payload))
		},
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setCartItems
} = bookCartSlice.actions
export const bookCartReducer = bookCartSlice.reducer 