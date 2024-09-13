import React, { useEffect, useState } from "react"
import { Book, LibraryBook, CartItem } from "../../types/common"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { toggleShowModal, setModalProps, setModalType } from "../../slices/modalSlice"
import { setCartItems } from "../../slices/bookCartSlice"
import { addToast } from "../../slices/toastSlice"
import { v4 as uuidv4 } from "uuid" 
import { IconButton } from "../page-elements/IconButton"
import { FaBookmark as Bookmark } from "react-icons/fa";
import { IconContext } from "react-icons"

export interface Props {
	book: Book | null
	availableCopies: Array<LibraryBook>
}

interface FormValues {
	libraryBookId: string
}

export const AddBookToCartForm = ({book, availableCopies}: Props) => {
	const defaultForm: FormValues = {
		libraryBookId: ""
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
	const cartItem = cartItems.find((cItem: CartItem) => cItem?.book?.id === book?.id)

	useEffect(() => {
		reset({
			...defaultForm,
			libraryBookId: availableCopies?.find((book) => book.libraryId === userProfile?.libraryId)?.id.toString() ?? ""
		})
	}, [book, availableCopies])

	const onRemoveFromList = (cartItemId: string) => {
		dispatch(setCartItems(cartItems.filter((cItem: CartItem) => cItem.cartItemId !== cartItemId)))
		dispatch(addToast({
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "Removed from list successfully!"
		}))
	}

	const onSubmit = (values: FormValues) => {
		const copy = availableCopies.find((copy) => copy.id === Number(watch("libraryBookId")))
		dispatch(setCartItems([...cartItems, {
			cartItemId: uuidv4(),	
			book: book ?? {} as Book,
			libraryId: copy?.libraryId ?? 0,
			libraryBookId: Number(watch("libraryBookId")) ?? 0,	
			bookStatusId: copy?.bookStatusId ?? 0
		}]))
		dispatch(addToast({
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "Added to list successfully!",
		}))
	}

	return (
		<form>
			<div className = "tw-flex tw-flex-col tw-gap-y-2">
				<div>
					<label className = "label tw-font-bold" htmlFor = "library-book-select">Select Location</label>
					<select disabled={cartItem != null} className = "tw-w-full" id = {"library-book-select"} {...register("libraryBookId", registerOptions.libraryBookId)}>
						{availableCopies?.map((libraryBook) => {
							const library = libraries?.find((library) => library.id === libraryBook.libraryId)
							return (
								<option key = {libraryBook.id} value = {libraryBook.id}>{library?.name}</option>
							)
						})}	
					</select>	
				</div>
				{errors?.libraryBookId ? <span className = "tw-text-red-700">{errors.libraryBookId?.message}</span> : null}
				{availableCopies?.length ? (
					!cartItem ? (
						<IconButton onClick={(e) => {
							e.preventDefault()
							handleSubmit(onSubmit)()
						}} className = {"button"}>
							<div className = "tw-flex tw-flex-row tw-items-center tw-gap-x-2">		
						 		<IconContext.Provider value = {{color: "white", className: "tw-w-4 tw-h-4"}}>
			                         <Bookmark/> 
			                     </IconContext.Provider> 
						 		<span>Add to List</span>
						 	</div>	
						</IconButton>
					) : (
						<IconButton onClick={(e) => {
							e.preventDefault()
							onRemoveFromList(cartItem.cartItemId)}
						} className = {"button --alert"}>
							<div className = "tw-flex tw-flex-row tw-items-center tw-gap-x-2">		
						 		<IconContext.Provider value = {{color: "white", className: "tw-w-4 tw-h-4"}}>
			                         <Bookmark/> 
			                     </IconContext.Provider> 
						 		<span>Remove from List</span>
						 	</div>
						</IconButton>
					)
				) : null}
			</div>
		</form>
	)
}