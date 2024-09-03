import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	GENRE_URL, 
} from "../../helpers/urls" 
import { CustomError, Genre } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const genreApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getGenres: builder.query<Array<Genre>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${GENRE_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["Genres"]
		}),
	}),
})

export const { 
	useGetGenresQuery, 
} = genreApi 