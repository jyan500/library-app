import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	CHECKOUT_VALIDATE_URL, 
	CHECKOUT_CANCEL_URL,
	CHECKOUT_SUBMIT_URL,
} from "../../helpers/api-endpoints" 
import { CartItem, CustomError } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

interface CheckoutValidateResponse {
	cartId: number
	sessionEnd: Date
	message: string
}

export const checkoutApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		checkoutValidate: builder.mutation<CheckoutValidateResponse, Array<CartItem>>({
			query: (cartItems) => ({
				url: `${CHECKOUT_VALIDATE_URL}`,
				method: "POST",
				body: {
					cart_items: cartItems.map((item: CartItem) => {
						return {
							library_book_id: item.libraryBookId,
							book_status_id: item.bookStatusId,
							cart_item_id: item.cartItemId
						}
					}),
				}
			}),
		}),	
		checkoutSubmit: builder.mutation<{userBorrowHistoryId: string, message: string}, {cartId: number, cartItems: Array<CartItem>}>({
			query: ({cartId, cartItems}) => ({
				url: `${CHECKOUT_SUBMIT_URL}`,
				method: "POST",
				body: {
					cart_items: cartItems.map((item: CartItem) => {
						return {
							library_book_id: item.libraryBookId,
							book_status_id: item.bookStatusId,
							cart_item_id: item.cartItemId
						}
					}),
					cart_id: cartId 
				}
			}),
			invalidatesTags: ["UserBooks", "UserBorrowHistory"]
		}),
		checkoutCancel: builder.mutation<{message: string}, number>({
			query: (dbCartId) => ({
				url: `${CHECKOUT_CANCEL_URL}`,
				method: "POST",
				body: {
					cart_id: dbCartId
				}
			})
		})
	}),
})

export const { 
	useCheckoutValidateMutation,
	useCheckoutSubmitMutation,
	useCheckoutCancelMutation
} = checkoutApi 