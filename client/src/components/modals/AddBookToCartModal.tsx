import React, { useEffect, useState } from "react"
import { Book, LibraryBook } from "../../types/common"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { toggleShowModal, setModalProps, setModalType } from "../../slices/modalSlice"
import { setCartItems } from "../../slices/bookCartSlice"
import { addToast } from "../../slices/toastSlice"
import { RowBookCard } from "../RowBookCard" 
import { v4 as uuidv4 } from "uuid" 

export interface Props {
	book: Book | null
	availableCopies: Array<LibraryBook>
}

interface FormValues {
	libraryBookId: number
}

export const AddBookToCartModal = ({book, availableCopies}: Props) => {
	const defaultForm: FormValues = {
		libraryBookId: 0
	}
	const dispatch = useAppDispatch()
	const { showModal } = useAppSelector((state) => state.modal)
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const { libraries } = useAppSelector((state) => state.library)
	const { cartItems } = useAppSelector((state) => state.bookCart)
	const [ preloadedValues, setPreloadedValues ] = useState<FormValues>(defaultForm)
	const { register, handleSubmit, reset, watch, setValue, formState: {errors} } = useForm({defaultValues: preloadedValues})
	const registerOptions = {
		libraryBookId: { required: "Please select a location"},
	}

	useEffect(() => {
		reset({
			...defaultForm,
			libraryBookId: availableCopies?.find((book) => book.libraryId === userProfile?.libraryId)?.id ?? 0
		})
	}, [showModal])

	const onSubmit = (values: FormValues) => {
		const copy = availableCopies.find((copy) => copy.id === Number(watch("libraryBookId")))
		dispatch(setCartItems([...cartItems, {
			cartItemId: uuidv4(),	
			book: book ?? {} as Book,
			libraryId: copy?.libraryId ?? 0,
			libraryBookId: Number(watch("libraryBookId")) ?? 0,	
			bookStatusId: copy?.bookStatusId ?? 0
		}]))
		dispatch(toggleShowModal(false))
		dispatch(setModalProps({}))
		dispatch(addToast({
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "Added to list successfully!",
		}))
	}

	return (
		<form>
			<div className = "tw-flex tw-flex-col tw-px-4 tw-gap-y-4">
				<div className = "tw-bg-primary tw-p-4">
					<span className = "tw-font-bold tw-text-3xl tw-text-white">Add To List</span>
				</div>
				<RowBookCard book={book}/>	
				<div className = "tw-flex tw-flex-col tw-gap-y-2">
					<div>
						<label className = "label tw-font-bold" htmlFor = "library-book-select">Select Location</label>
						<select className = "tw-w-full" id = {"library-book-select"} {...register("libraryBookId", registerOptions.libraryBookId)}>
							{availableCopies?.map((libraryBook) => {
								const library = libraries?.find((library) => library.id === libraryBook.libraryId)
								return (
									<option key = {libraryBook.id} value = {libraryBook.id}>{library?.name}</option>
								)
							})}	
						</select>	
					</div>
					{errors?.libraryBookId ? <span className = "tw-text-red-700">{errors.libraryBookId?.message}</span> : null}
				</div>
				<button onClick={handleSubmit(onSubmit)} className = "button">Submit</button>
			</div>
		</form>
	)
}