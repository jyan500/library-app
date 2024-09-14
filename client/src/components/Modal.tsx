import React from "react"
import { IoMdClose } from "react-icons/io";
import "../styles/modal.css"
import { setModalProps, toggleShowModal } from "../slices/modalSlice" 
import { BookCartModal } from "./modals/BookCartModal"
import { ReturnBookModal } from "./modals/ReturnBookModal" 
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { GenericProps } from "../types/common" 

export const modalTypes = {
	"BOOK_CART_MODAL": BookCartModal,
	"RETURN_BOOK_MODAL": ReturnBookModal,
}

export const modalClassNames = {
	"BOOK_CART_MODAL": "!tw-w-full !tw-h-full md:!tw-w-1/2 tw-top-[50%]",
	"RETURN_BOOK_MODAL": "!tw-w-full !tw-h-full md:!tw-w-1/2 md:!tw-h-1/3 tw-top-[50%]",
}

// type for partial subset of keys
type PartialKeys<T> = Partial<{ [K in keyof T]: Record<string, any>}>

export const Modal = () => {
	const dispatch = useAppDispatch()
	const { currentModalType, showModal, currentModalProps }  = useAppSelector((state) => state.modal)

	const ModalContent = modalTypes[currentModalType as keyof typeof modalTypes] as React.FC 

	// define modal handlers type as the partial subset of all keys of modal types
	const modalHandlers: PartialKeys<typeof modalTypes> = {
	} 

	return (
		<div className = {`overlay ${showModal ? "--visible": "--hidden"}`}>
			<div className = {`${currentModalType in modalClassNames ? modalClassNames[currentModalType as keyof typeof modalClassNames] : "tw-top-[30%]"} modal-container`}>
				<button 
				className = "__modal-container-close --transparent"
				onClick={
					() => {
						if (modalHandlers[currentModalType as keyof typeof modalHandlers]?.dismissHandler){
							modalHandlers[currentModalType as keyof typeof modalHandlers]?.dismissHandler()
						}
						else {
							dispatch(toggleShowModal(false))
							dispatch(setModalProps({}))
						}
					}
				}
				>
					<IoMdClose className = "icon"/>
				</button>
				<div className = "modal">
					<div className = "modal-content">
					{ModalContent ? <ModalContent {...currentModalProps}/> : null}
					</div>
				</div>
			</div>	
		</div>
	)	
}