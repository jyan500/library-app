import React from "react"
import { IoIosWarning as WarningIcon } from "react-icons/io"
import { IconContext } from "react-icons"
import { BookConfirmation, Toast } from "../../types/common"
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks"
import { addToast } from "../../slices/toastSlice"
import { useReturnUserBooksMutation } from "../../services/private/userBook"
import { LoadingSpinner } from "../LoadingSpinner"
import { LoadingButton } from "../page-elements/LoadingButton"
import { toggleShowModal, setModalProps } from "../../slices/modalSlice"
import { setBooksToReturn } from "../../slices/bookReturnSlice"
import { v4 as uuidv4 } from "uuid"

export const ReturnBookModal = () => {

	const [returnUserBooks, {isLoading, error}] = useReturnUserBooksMutation()
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	const { booksToReturn: books } = useAppSelector((state) => state.bookReturn)
	const dispatch = useAppDispatch()
	const availableStatus = bookStatuses?.find((status) => status.name === "Available")

	const onSubmit = async () => {
		const defaultToast: Toast = {
			id: uuidv4(),
			type: "failure",
			animationType: "animation-in",
			message: "Something went wrong! Books could not be returned."
		}
		if (availableStatus?.id && books?.length){
			try {
				await returnUserBooks(books.map((book) => ({
					userBookId: book.userBookId,
					libraryBookId: book.libraryBookId,
					bookStatusId: availableStatus.id}))).unwrap()
				dispatch(addToast({...defaultToast,
					type: "success",
					message: "Books returned successfully!"
				}))
				// remove the books from returned books list
				dispatch(setBooksToReturn([]))
				dispatch(toggleShowModal(false))
				dispatch(setModalProps({}))
			}
			catch (e){
				dispatch(addToast(defaultToast))
			}
		}
		else {
			dispatch(addToast(defaultToast))
		}
	}

	const onCancel = () => {
		dispatch(toggleShowModal(false))
		dispatch(setModalProps({}))
	}


	return (
		<div className = "tw-flex tw-flex-col tw-px-4 tw-gap-y-4 tw-w-full">
			<div className = "tw-flex tw-flex-col tw-gap-y-2">
				<div className = "tw-bg-primary tw-p-4 tw-flex tw-flex-row tw-items-center tw-gap-x-2">
					<IconContext.Provider value={{color: "var(--bs-warning)", className: "tw-flex-shrink-0 tw-w-12 tw-h-12"}}>
						<WarningIcon/>	
					</IconContext.Provider>
					<span className = "tw-font-bold tw-text-white tw-text-3xl">Return Books</span>	
				</div>
				<span className = "tw-font-bold">You are about to return {books?.length} {books?.length === 1 ? "book" : "books"}. Are you sure you want to continue?</span>
			</div>	
			<div className = "tw-flex tw-flex-row tw-gap-x-2">
				<LoadingButton isLoading={isLoading} text={"Return"} onClick={() => onSubmit()}/>
				<button onClick={onCancel} className = "button --alert">Cancel</button>
			</div>
		</div>
	)
}