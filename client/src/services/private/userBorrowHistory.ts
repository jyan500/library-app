import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	USER_BORROW_HISTORY_URL, 
	USER_BORROW_HISTORY_RECENT_URL, 
} from "../../helpers/api-endpoints" 
import { CustomError, UserBorrowHistory, ListResponse } from "../../types/common" 
import { privateApi } from "../private"

export const userBorrowHistoryApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getUserBorrowHistories: builder.query<ListResponse<UserBorrowHistory>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${USER_BORROW_HISTORY_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["UserBorrowHistory"]
		}),
		getUserBorrowHistory: builder.query<Array<UserBorrowHistory>, {id: number, urlParams: Record<string, any>}>({
			query: ({id, urlParams}) => ({
				url: `${USER_BORROW_HISTORY_URL}/${id}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["UserBorrowHistory"]
		}),
		getRecentUserBorrowHistory: builder.query<Array<UserBorrowHistory>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${USER_BORROW_HISTORY_RECENT_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["UserBorrowHistory"]
		})
	}),
})

export const { 
	useGetUserBorrowHistoriesQuery,
	useGetUserBorrowHistoryQuery,
	useGetRecentUserBorrowHistoryQuery,
} = userBorrowHistoryApi 
