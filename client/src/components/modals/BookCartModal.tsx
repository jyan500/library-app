import React, { useEffect, useState } from "react"
import { Book, LibraryBook, CustomError, CheckoutCustomError } from "../../types/common"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { toggleShowModal, setModalProps, setModalType } from "../../slices/modalSlice"
import { setCartItems } from "../../slices/bookCartSlice"
import { Link } from "react-router-dom"
import { BOOKS_SEARCH } from "../../helpers/routes"
import { CartItem } from "../../types/common" 
import { addToast } from "../../slices/toastSlice"
import { RowBookCard } from "../RowBookCard"
import { useCheckoutMutation } from "../../services/private/checkout"
import { IoIosWarning as WarningIcon } from "react-icons/io"
import { IconContext } from "react-icons"
import { v4 as uuidv4 } from "uuid" 

export const BookCartModal = () => {
	const dispatch = useAppDispatch()
	const { showModal } = useAppSelector((state) => state.modal)
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	const { libraries } = useAppSelector((state) => state.library)
	const { cartItems } = useAppSelector((state) => state.bookCart)
	const [ checkout, {isLoading, error}] = useCheckoutMutation() 

	useEffect(() => {
		if (error && "status" in error){
		}
	}, [error])

	const removeFromList = (cartItemId: string) => {
		dispatch(setCartItems(cartItems.filter((cItem: CartItem) => cItem.cartId !== cartItemId)))
		dispatch(addToast({
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "Removed from list successfully!"
		}))
	}

	const onCheckout = async () => {
		try {
			await checkout(cartItems).unwrap()
		}
		catch (e){
			dispatch(addToast({
				id: uuidv4(),
				message: "Something has gone wrong. One or more books are no longer available!",
				animationType: "animation-in",
				type: "failure"
			}))
		}
	}

	return (
		<div className = "tw-flex tw-flex-col tw-px-4 tw-gap-y-4">
			<div className = "tw-bg-primary tw-p-4">
				<span className = "tw-font-bold tw-text-3xl tw-text-white">My List</span>
			</div>
			{cartItems?.length ? (
				<div className = "tw-flex tw-flex-col tw-gap-y-2">
					<p className = "tw-font-bold tw-text-2xl">Total: {cartItems?.length}</p>
					{cartItems?.map((item: CartItem) => {
						const cannotCheckout = error && "status" in error && error.data?.errors?.find((data: CheckoutCustomError) => data.cartId === item.cartId)
						return (
							<div className = "tw-relative">
								<RowBookCard 
									highlightBorder={`${cannotCheckout ? "tw-border tw-border-red-500" : ""}`} 
									book={item.book}
								>
									<>
										<div className = "tw-border-t tw-border-gray-300"></div>
										<div>
											{cannotCheckout ? 
												<s className = "tw-text-red-500">{bookStatuses.find((status) => status.id === item.bookStatusId)?.name}</s> 
												: (<span>{bookStatuses.find((status) => status.id === item.bookStatusId)?.name}</span>)}	
										</div>
										<div>
											<span>{libraries.find((library) => library.id === item.libraryId)?.name} Library</span>
										</div>
										<div className = "mt-auto">
											<button onClick = {() => removeFromList(item.cartId)} className = "button --alert">Remove from List</button>
										</div>
									</>
								</RowBookCard>
								{cannotCheckout ? (
									<IconContext.Provider value={{color: "var(--bs-danger)", className: "tw-absolute tw-top-3 tw-right-3 tw-w-10 tw-h-10"}}>
										<WarningIcon/>		
									</IconContext.Provider>
								) : null}
							</div>
						)	
					})}
					<button onClick={onCheckout} className = "button">Checkout</button>
				</div>
			) : (
				<div className = "tw-w-full tw-h-full tw-justify-center tw-items-center">
					<p className = "tw-font-bold tw-text-xl">Your List is currently empty. Check out our <Link onClick = {() => {
						dispatch(toggleShowModal(false))
						dispatch(setModalProps({}))
					}} className = "tw-text-primary" to = {BOOKS_SEARCH}>catalog</Link> to find books!</p>
				</div>
			)}
		</div>
	)
}