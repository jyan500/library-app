import React from "react"
import { IoMdClose } from "react-icons/io";
import "../styles/modal.css"
import { toggleShowModal } from "../slices/modalSlice" 
import { BookCheckoutForm } from "./modals/BookCheckoutForm"
import { BookAvailabilityModal } from "./modals/BookAvailabilityModal" 
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 

export const modalTypes = {
	"BOOK_CHECKOUT_FORM": BookCheckoutForm,
	"BOOK_AVAILABILITY": BookAvailabilityModal
}

export const modalClassNames = {
}

// // type for partial subset of keys
// type PartialKeys<T> = Partial<{ [K in keyof T]: Record<string, any>}>

export const Modal = () => {
	const dispatch = useAppDispatch()
	const { currentModalType, showModal }  = useAppSelector((state) => state.modal)
	// const ModalContent = modalTypes[currentModalType as keyof typeof modalTypes] 

	// define modal handlers type as the partial subset of all keys of modal types
	// const modalHandlers: PartialKeys<typeof modalTypes> = {
	// } 

	return (
		// <div className = {`overlay ${showModal ? "--visible": "--hidden"}`}>
		// 	<div className = {`${currentModalType in modalClassNames ? modalClassNames[currentModalType as keyof typeof modalClassNames] : "tw-top-[30%]"} modal-container`}>
		// 		<button 
		// 		className = "__modal-container-close --transparent"
		// 		onClick={
		// 			() => {
		// 				if (modalHandlers[currentModalType as keyof typeof modalHandlers]?.dismissHandler){
		// 					modalHandlers[currentModalType as keyof typeof modalHandlers]?.dismissHandler()
		// 				}
		// 				else {
		// 					dispatch(toggleShowModal(false))
		// 				}
		// 			}
		// 		}
		// 		>
		// 			<IoMdClose className = "icon"/>
		// 		</button>
		// 		<div className = "modal">
		// 			<div className = "modal-content">
		// 				{
		// 					ModalContent ? <ModalContent/> : null
		// 				}
		// 			</div>
		// 		</div>
		// 	</div>	
		// </div>
		<div></div>
	)	
}