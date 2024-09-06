import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	BOOK_STATUS_URL, 
} from "../../helpers/api-endpoints" 
import { CustomError, BookStatus } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const bookStatusApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getBookStatuses: builder.query<Array<BookStatus>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${BOOK_STATUS_URL}`,
				method: "GET",
				params: urlParams
			}),
		}),
	}),
})

export const { 
	useGetBookStatusesQuery, 
} = bookStatusApi 