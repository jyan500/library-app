import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	CHECKOUT_URL, 
} from "../../helpers/api-endpoints" 
import { CartItem, CustomError } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const checkoutApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		checkout: builder.mutation<{id: number, message: string}, Array<CartItem>>({
			query: (cartItems) => ({
				url: `${CHECKOUT_URL}`,
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
	useCheckoutMutation,
} = checkoutApi 