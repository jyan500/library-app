import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface AuthState {
    token: string | null
}

const initialState: AuthState = {
	token: localStorage.getItem("token") ?? null 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token")
            localStorage.removeItem("cartItems")
            state.token = null
        },
        setCredentials: (state, {payload: { token }}: PayloadAction<{ token: string }>) => {
            localStorage.setItem("token", token)
            state.token = token
        },
    },
})

export const { logout, setCredentials } = authSlice.actions

export const authReducer = authSlice.reducer
