import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	RETURN_USER_BOOK_URL, 
} from "../../helpers/api-endpoints" 
import { CustomError, UserBook, ListResponse } from "../../types/common" 
import { privateApi } from "../private"

export const userBookApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		returnUserBooks: builder.mutation<{message: string}, Array<{userBookId: number, bookStatusId: number, libraryBookId: number}>>({
			query: (books) => ({
				url: RETURN_USER_BOOK_URL,
				method: "POST",
				body: {books: books.map((book) => ({
					user_book_id: book.userBookId,
					book_status_id: book.bookStatusId,
					library_book_id: book.libraryBookId,
				}))}
			}),
			invalidatesTags: ["UserBooks", "UserBorrowHistory"]
		})
	}),
})

export const { 
	useReturnUserBooksMutation
} = userBookApi 