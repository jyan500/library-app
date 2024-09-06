import { createSlice, current } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { logout } from "./authSlice" 
import { GenericProps } from "../types/common"
import { modalTypes } from "../components/Modal"


interface ModalState<T = {}> {
	showModal: boolean
	currentModalType: keyof typeof modalTypes 
	currentModalProps: T 
}

const initialState: ModalState = {
	showModal: false,
	currentModalType: "BOOK_CHECKOUT_FORM",
	currentModalProps: {},
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleShowModal(state, action: PayloadAction<boolean>){
			state.showModal = action.payload
		},
		setModalType(state, action: PayloadAction<keyof typeof modalTypes>){
			state.currentModalType = action.payload	
		},
		setModalProps: <T>(state: ModalState<T>, action: PayloadAction<T>) => {
	    	state.currentModalProps = action.payload
	    },
	},
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return initialState
        })
    }
})

export const { 
	setModalType, 
	setModalProps,
	toggleShowModal 
} = modalSlice.actions
export const modalReducer = modalSlice.reducer 