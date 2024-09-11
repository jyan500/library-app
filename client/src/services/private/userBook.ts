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
		returnUserBook: builder.mutation<{message: string}, {userBookId: number, bookStatusId: number, libraryBookId: number}>({
			query: ({userBookId, libraryBookId, bookStatusId}) => ({
				url: RETURN_USER_BOOK_URL,
				method: "POST",
				body: {
					user_book_id: userBookId,
					library_book_id: libraryBookId,
					book_status_id: bookStatusId,
				}
			}),
			invalidatesTags: ["UserBooks", "UserBorrowHistory"]
		})
	}),
})

export const { 
	useReturnUserBookMutation
} = userBookApi 