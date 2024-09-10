import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import type { CartItem } from "../types/common" 
import { logout } from "./authSlice"

interface BookCartState {
	cartItems : Array<CartItem>
	dbCartId?: number | null
	sessionEndTime?: Date | null
}

const initialState: BookCartState = {
	cartItems: [],
	dbCartId: null,
	sessionEndTime: null
}

export const bookCartSlice = createSlice({
	name: "bookCart",
	initialState,
	reducers: {
		setCartItems(state, action:PayloadAction<Array<CartItem>>){
			state.cartItems = action.payload
			localStorage.setItem("cartItems", JSON.stringify(action.payload))
		},
		setDbCartId(state, action:PayloadAction<number>){
			state.dbCartId = action.payload
		},
		setSessionEndTime(state, action: PayloadAction<Date>){
			state.sessionEndTime = action.payload	
		}
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setCartItems,
	setDbCartId,
	setSessionEndTime,
} = bookCartSlice.actions
export const bookCartReducer = bookCartSlice.reducer 