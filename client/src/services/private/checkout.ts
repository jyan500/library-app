import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	CHECKOUT_VALIDATE_URL, 
} from "../../helpers/api-endpoints" 
import { CartItem, CustomError } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

type CheckoutValidateResponse = {
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
					cartItems: cartItems.map((item: CartItem) => {
						return {
							library_book_id: item.libraryBookId,
							book_status_id: item.bookStatusId,
							cart_id: item.cartId
						}
					}),
				}
			}),
			invalidatesTags: ["UserBorrowHistory", "UserBooks"]
		}),	
	}),
})

export const { 
	useCheckoutValidateMutation,
} = checkoutApi 