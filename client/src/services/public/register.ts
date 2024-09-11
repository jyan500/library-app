import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BACKEND_BASE_URL, REGISTER_URL } from "../../helpers/api-endpoints" 
import { CustomError } from "../../types/common" 
import { publicApi } from "../public" 

export interface Response {
	message: string
}

export interface RegisterRequest {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	libraryId: string | null
}

export const userRegisterApi = publicApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		userRegister: builder.mutation<Response, RegisterRequest>({
			query: (registrationInfo) => ({
				url: REGISTER_URL,
				method: "POST",
				body: {
					first_name: registrationInfo.firstName,
					last_name: registrationInfo.lastName,
					email: registrationInfo.email,
					password: registrationInfo.password,
					confirm_password: registrationInfo.confirmPassword,
					library_id: registrationInfo.libraryId
				} 
			})	
		}),
	}),
})

export const { useUserRegisterMutation } = userRegisterApi