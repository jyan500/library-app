import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { setCredentials } from "../slices/authSlice" 
import { useLoginMutation } from "../services/public/auth" 
import {v4 as uuidv4} from "uuid"
import { Link, useLocation, useNavigate } from "react-router-dom" 
import { useForm } from "react-hook-form"
import { parseErrorResponse } from "../helpers/functions"
import { REGISTER } from "../helpers/routes"

interface FormValues {
	email: string
	password: string
}

export const Login = () => {
	const dispatch = useAppDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	const [login, { isLoading, error }] = useLoginMutation()
	const { token } = useAppSelector((state) => state.auth)
	const { register , handleSubmit, formState: {errors} } = useForm<FormValues>()
	const registerOptions = {
	    email: { required: "Email is required" },
	    password: { required: "Password is required"},
    }
    useEffect(() => {
    	// 
    	if (token){
    		navigate("/", {replace: true})
    	}	
    }, [navigate, token])

    useEffect(() => {
    	window.history.replaceState(null, location.pathname)
    }, [])

	const onSubmit = async (values: FormValues) => {
		try {
			const data = await login(values).unwrap()
			dispatch(setCredentials(data))
		}
		catch (err) {
		}
	}
	return (
		<div className = "tw-w-full">
			{/* checking if "status" in error narrows down the type to the CustomError defined in services/auth.ts,
			 rather than SerializedError Type */}
			<div><h1>Login</h1></div>
			<form className = "tw-flex tw-flex-col tw-gap-y-4" onSubmit={handleSubmit(onSubmit)}>
				{error && "status" in error ? (error?.data?.errors?.map((errorMessage: string, i: number) => <p className = "--text-alert" key = {`login_error_${i}`}>{errorMessage}</p>)) : null}
				{location.state?.alert ? <p>{location.state.alert}</p> : null}
				<div>
					<div>
					    <label className = "label" htmlFor = "login-email">
					    	Email: 
					    </label>
						<input 
						id="login-email"
						type="text"
						className="tw-w-full"
						{...register("email", registerOptions.email)}
						/>
				        {errors?.email && <small className = "--text-alert">{errors?.email.message}</small>}
				    </div>
				</div>
				<div>
				    <div>
					    <label className = "label" htmlFor = "login-password">
					    	Password:
					    </label>
						<input 
						id="login-password"
						type="password"
						className="tw-w-full"
						{...register("password", registerOptions.password)}
						/>
				        {errors?.password && <small className = "--text-alert">{errors?.password.message}</small>}
				    </div>
				</div>
				<div>
				    <div>
						<button className = "button" type = "submit">Submit</button>
					</div>
				</div>
				<div>
					<div>
						<small>Don't have an account? Click <Link className = "tw-text-sky-500" to={REGISTER}>Here</Link> to Register</small>
					</div>
				</div>
			</form>
		</div>
	)	
}