import React, { useEffect } from "react"
import { Container } from "../components/page-elements/Container"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { RowBookCard } from "../components/RowBookCard"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { useCheckoutSubmitMutation, useCheckoutCancelMutation } from "../services/private/checkout"
import { CONFIRMATION, HOME } from "../helpers/routes"
import { CartItem } from "../types/common"
import { addToast } from "../slices/toastSlice"
import { setCartItems, setDbCartId, setSessionEndTime } from "../slices/bookCartSlice"
import { BOOK_CHECKOUT_NUM_DAYS } from "../helpers/constants" 
import { IconButton } from "../components/page-elements/IconButton"
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../types/common"

export const Checkout = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { cartItems, dbCartId } = useAppSelector((state) => state.bookCart)
	const { libraries } = useAppSelector((state) => state.library)
	const [ checkoutSubmit, {isLoading: isSubmitLoading, error: submitError} ] = useCheckoutSubmitMutation()
	const [ checkoutCancel, {isLoading: isCancelLoading, error: cancelError} ] = useCheckoutCancelMutation()

	const dueDate = new Date()
	dueDate.setDate(dueDate.getDate() + BOOK_CHECKOUT_NUM_DAYS)

	const cancelCheckout = async () => {
		if (dbCartId){
			try {
				await checkoutCancel(dbCartId).unwrap()
				dispatch(addToast({
					id: uuidv4(),
					message: "Checkout has been cancelled",
					type: "success",
					animationType: "animation-in"
				}))
			}
			catch (e){
				dispatch(addToast({
					id: uuidv4(),
					message: "Something went wrong while cancelling your checkout.",
					type: "failure",
					animationType: "animation-in"
				}))
			}
		}
		dispatch(setDbCartId(null))
		dispatch(setSessionEndTime(null))
		navigate("/", {replace: true})
	}

	const onCheckout = async () => {
		if (dbCartId){
			try {
				const data = await checkoutSubmit({cartId: dbCartId, cartItems: cartItems}).unwrap()
				dispatch(addToast({
					id: uuidv4(),
					message: "Checkout was successful!",
					type: "success",
					animationType: "animation-in"
				}))
				dispatch(setCartItems([]))
				navigate(CONFIRMATION, {state: {userBorrowHistoryId: data.userBorrowHistoryId}, replace: true})
			}
			catch (e) {
				const error = e as CustomError
				let message = "Please press the 'Return to Home' button in the top right and re-enter the cart to try again"
				if (error.status === 400){
					dispatch(addToast({
						id: uuidv4(),
						message: `Something went wrong during your transaction. ${error.data?.errors?.[0]}. ${message}`,
						type: "failure",
						animationType: "animation-in"
					}))
				}
				else {
					dispatch(addToast({
						id: uuidv4(),
						message: `Something went wrong during your transaction. ${message}`,
						type: "failure",
						animationType: "animation-in"
					}))
				}
			}
		}
	}

	return (
		<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
			<div>
				<IconButton onClick={cancelCheckout}>
					<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
	                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
	                        <Previous/> 
	                    </IconContext.Provider> 
	                    <span className = "tw-font-bold tw-text-lg">Return to Home</span>
                    </div>
				</IconButton>
			</div>
			<p className = "tw-font-bold tw-text-3xl">Checkout</p>
			<p className = "tw-font-bold tw-text-2xl">Total: {cartItems?.length}</p>
			{cartItems?.map((item: CartItem) => {
				return (
					<RowBookCard 
						key={item.cartItemId}
						book={item.book}
					>
						<>
							<div className = "tw-border-t tw-border-gray-300"></div>
							<div>
								<span>{libraries.find((library) => library.id === item.libraryId)?.name} Library</span>
							</div>
							<div>
								<span className = "tw-font-bold">Due Date: {dueDate.toLocaleDateString("en-US")}</span>
							</div>
						</>
					</RowBookCard>
				)	
			})}
			<button onClick={onCheckout} className = "button">Checkout</button>
		</div>
	)	
}