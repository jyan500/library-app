import React, {useEffect} from "react"
import { PageHeader } from "../components/page-elements/PageHeader"
import { Link, useLocation } from "react-router-dom"
import { Container } from "../components/page-elements/Container"
import { useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { displayUser } from "../helpers/functions"
import { LIBRARIES } from "../helpers/routes"
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons" 
import { useUpdateUserProfileMutation } from "../services/private/userProfile"
import { v4 as uuidv4 } from "uuid"
import { addToast } from "../slices/toastSlice"
import { Toast } from "../types/common"

interface FormValues { 
	firstName: string
	lastName: string
	email: string
	libraryId: string
}

export const AccountDisplay = () => {
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const { libraries } = useAppSelector((state) => state.library)
	const dispatch = useAppDispatch()
	const [ updateUserProfile, {isLoading, error}] = useUpdateUserProfileMutation()
	const library = libraries.find((library) => library.id === userProfile?.libraryId)

	const defaultValues = {
		firstName: "",
		lastName: "",
		email: "",
		libraryId: "",
	}
	const { reset, register: formRegister, handleSubmit, formState: {errors} } = useForm<FormValues>({defaultValues: defaultValues})
	const registerOptions = {
		firstName: { required: "First Name is required"},
		lastName: { required: "Last Name is required"},
	    email: { required: "Email is required" },
    }

    useEffect(() => {
    	reset({
    		firstName: userProfile?.firstName ?? "",
			lastName: userProfile?.lastName ?? "",
			email: userProfile?.email ?? "",
			libraryId: userProfile?.libraryId?.toString() ?? "",
    	})	
    }, [userProfile])

	const onSubmit = async (values: FormValues) => {
		let defaultToast: Toast = {
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "User Profile updated successfully!"
		}
		if (userProfile?.id){
			try {
				const data = await updateUserProfile({
					id: userProfile.id,
					userProfile: {
						...values,
						libraryId: values.libraryId !== "" ? values.libraryId : null
					}
				}).unwrap()
				dispatch(addToast(defaultToast))
			}
			catch (err) {
				dispatch(addToast({
					...defaultToast,
					type: "failure",
					message: "Something went wrong. User Profile could not be updated"
				}))
			}
		}
	}

	return (
		<div className = "tw-w-full tw-flex tw-flex-col tw-mt-4 tw-gap-y-4">
			<PageHeader>
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Account</p>	
				<p className = "tw-text-white">View and Edit your Account Information</p>
			</PageHeader>
			<Container>
				<div className = "tw-p-4 tw-flex-col tw-gap-y-8 tw-flex lg:tw-flex-row tw-gap-x-8">
					<div className = "lg:tw-w-1/3 tw-p-4 tw-rounded-md tw-bg-primary tw-text-white tw-flex tw-flex-col tw-items-center tw-gap-y-2">
						<IconContext.Provider value={{color: "white", className: "tw-h-24 tw-w-24"}}>
							<CgProfile/>	
						</IconContext.Provider>
						<span>{displayUser(userProfile)}</span>
						<span>{userProfile?.email}</span>
						{
							userProfile?.libraryId && library ? (
								<Link to={`${LIBRARIES}/${userProfile?.libraryId}`}>{library.name}</Link>
							) : null
						}
					</div>
					<div className = "lg:tw-w-2/3 tw-flex tw-flex-col tw-gap-y-2">
						<span className = "tw-font-bold tw-text-3xl">Edit Account Information</span>
						<form className = "tw-flex tw-flex-col tw-gap-y-4" onSubmit={handleSubmit(onSubmit)}>
							{error && "status" in error ? (error.data.errors?.map((errorMessage: string, i: number) => <p className = "--text-alert" key = {`register_error_${i}`}>{errorMessage}</p>)) : null}
							<div>
								<div>
								    <label className = "label" htmlFor = "user-profile-firstname">
								    	First Name: <span className = "tw-font-bold tw-text-red-500">*</span>
								    </label>
									<input 
									id = "user-profile-firstname"
									type="text"
									className = "tw-w-full"
									{...formRegister("firstName", registerOptions.firstName)}
									/>
							        {errors?.firstName && <small className = "--text-alert">{errors.firstName.message}</small>}
						        </div>
						    </div>
						    <div>
						    	<div>
								    <label className = "label" htmlFor = "user-profile-lastname">
								    	Last Name: <span className = "tw-font-bold tw-text-red-500">*</span>
								    </label>
									<input 
									id = "user-profile-lastname"
									type="text"
									className = "tw-w-full"
									{...formRegister("lastName", registerOptions.lastName)}
									/>
							        {errors?.lastName && <small className = "--text-alert">{errors.lastName.message}</small>}
						        </div>
						    </div>
						    <div>
						    	<div>
								    <label className = "label" htmlFor = "user-profile-email">
								    	Email: <span className = "tw-font-bold tw-text-red-500">*</span>
								    </label>
									<input 
									id = "user-profile-email"
									type="text"
									className = "tw-w-full"
									{...formRegister("email", registerOptions.email)}
									/>
							        {errors?.email && <small className = "--text-alert">{errors.email.message}</small>}
							 	</div>
						    </div>
						    <div>
						    	<div>
								    <label className = "label" htmlFor = "user-profile-library">
								    	Library: 
								    </label>
									<select 
									id = "user-profile-library"
									className = "tw-w-full"
									{...formRegister("libraryId")}
									>
										<option value="" disabled></option>
										{libraries?.map((library) => {
											return (
												<option key = {library.id} value={library.id}>{library.name}</option>
											)
										})}
									</select>
							 	</div>
						    </div>
						    <div>
								<button className = "button" type = "submit">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</Container>
		</div>
	)
}