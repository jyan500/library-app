import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	BOOK_URL, 
} from "../../helpers/api-endpoints" 
import { CustomError, ListResponse, Book } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const bookApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getBooks: builder.query<ListResponse<Book>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${BOOK_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["Books"]
		}),
		getBook: builder.query<Array<Book>, number>({
			query: (id) => ({
				url: `${BOOK_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["Books"]
		}),
		addBook: builder.mutation<{id: number, message: string}, Book>({
			query: (book) => ({
				url: `${BOOK_URL}`,
				method: "POST",
				body: {
					title: book.title,
					image_url: book.imageURL,
					author: book.author,
					genre_id: book.genreId,
				}
			}),
			invalidatesTags: ["Books"]
		}),
		updateBook: builder.mutation<{message: string}, Book>({
			query: (book) => ({
				url: `${BOOK_URL}/${book.id}`,
				method: "PUT",
				body: {
					id: book.id,
					title: book.title,
					image_url: book.imageURL,
					author: book.author,
					genre_id: book.genreId,
				}
			}),
			invalidatesTags: ["Books"]
		}),
		deleteBook: builder.mutation<{message: string}, number>({
			query: (id) => ({
				url: `${BOOK_URL}/${id}`,
				method: "DELETE"
			}),
			invalidatesTags: ["Books"]
		}),
	}),
})

export const { 
	useGetBookQuery,
	useGetBooksQuery, 
	useLazyGetBooksQuery, 
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = bookApi 