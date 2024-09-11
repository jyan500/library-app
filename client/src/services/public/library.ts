import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	LIBRARY_URL, 
} from "../../helpers/api-endpoints" 
import { CustomError, ListResponse, Library } from "../../types/common" 
import { privateApi } from "../private"

export const libraryApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getLibraries: builder.query<Array<Library>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${LIBRARY_URL}`,
				method: "GET",
				params: urlParams
			}),
		}),
		getLibrary: builder.query<Array<Library>, number>({
			query: (id) => ({
				url: `${LIBRARY_URL}/${id}`,
				method: "GET",
			}),
		}),
	}),
})

export const { 
	useGetLibraryQuery,
	useGetLibrariesQuery, 
} = libraryApi 