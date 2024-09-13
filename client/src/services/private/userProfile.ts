import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../../store" 
import { BACKEND_BASE_URL, USER_PROFILE_URL } from "../../helpers/api-endpoints" 
import { CustomError, UserProfile } from "../../types/common" 
import { privateApi } from "../private"

type UserProfileUpdateRequest = {
	firstName: string
	lastName: string
	email: string
	libraryId: string | null
}

export const userProfileApi = privateApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getUserProfile: builder.query<UserProfile, void>({
			query: () => ({
				url: `${USER_PROFILE_URL}/me`,
				method: "GET",
			}),
			providesTags: ["UserProfiles"]
		}),
		getUserProfiles: builder.query<Array<UserProfile>, void>({
			query: () => ({
				url: USER_PROFILE_URL,	
				method: "GET",
			}),
			providesTags: ["UserProfiles"]
		}),
		updateUserProfile: builder.mutation<{message: string}, {id: number, userProfile: UserProfileUpdateRequest}>({
			query: ({userProfile, id}) => ({
				url: `${USER_PROFILE_URL}/${id}`,
				method: "PUT",
				body: {
					first_name: userProfile.firstName,			
					last_name: userProfile.lastName,
					email: userProfile.email,
					...(userProfile.libraryId ? { library_id: userProfile.libraryId } : {}),
				} 
			}),
			invalidatesTags: ["UserProfiles"]
		})
	}),
})

export const { 
	useGetUserProfileQuery,
	useGetUserProfilesQuery, 
	useUpdateUserProfileMutation 
} = userProfileApi 