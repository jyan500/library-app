import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	NEWS_POST_GENRE_URL, 
} from "../../helpers/urls" 
import { CustomError, NewsPostGenre } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const newsPostGenreApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getNewsPostGenres: builder.query<Array<NewsPostGenre>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${NEWS_POST_GENRE_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["NewsPostGenres"]
		}),
	}),
})

export const { 
	useGetNewsPostGenresQuery, 
} = newsPostGenreApi 