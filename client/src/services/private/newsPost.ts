import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { 
	BACKEND_BASE_URL, 
	NEWS_POST_URL
} from "../../helpers/api-endpoints" 
import { CustomError, NewsPost } from "../../types/common" 
import { privateApi } from "../private"
import { parseURLParams } from "../../helpers/functions" 

export const newsPostApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getNewsPosts: builder.query<Array<NewsPost>, Record<string, any>>({
			query: (urlParams) => ({
				url: `${NEWS_POST_URL}`,
				method: "GET",
				params: urlParams
			}),
			providesTags: ["NewsPosts"]
		}),
		getNewsPost: builder.query<Array<NewsPost>, number>({
			query: (id) => ({
				url: `${NEWS_POST_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["NewsPosts"]
		}),
		addNewsPost: builder.mutation<{id: number, message: string}, NewsPost>({
			query: (newsPost) => ({
				url: `${NEWS_POST_URL}`,
				method: "POST",
				body: {
					title: newsPost.title,
					image_url: newsPost.imageURL,
				}
			}),
			invalidatesTags: ["NewsPosts"]
		}),
		updateNewsPost: builder.mutation<{message: string}, NewsPost>({
			query: (newsPost) => ({
				url: `${NEWS_POST_URL}/${newsPost.id}`,
				method: "PUT",
				body: {
					id: newsPost.id,
					title: newsPost.title,
					image_url: newsPost.imageURL,
				}
			}),
			invalidatesTags: ["NewsPosts"]
		}),
		deleteNewsPost: builder.mutation<{message: string}, number>({
			query: (id) => ({
				url: `${NEWS_POST_URL}/${id}`,
				method: "DELETE"
			}),
			invalidatesTags: ["NewsPosts"]
		}),
	}),
})

export const { 
	useGetNewsPostsQuery, 
	useGetNewsPostQuery, 
	useAddNewsPostMutation,
	useUpdateNewsPostMutation,
	useDeleteNewsPostMutation,
} = newsPostApi 