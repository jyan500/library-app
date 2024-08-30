import React from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { SocialMedia } from "../components/page-elements/SocialMedia" 

import { IconContext } from "react-icons" 

const DefaultLayout = () => {
	const token = useAppSelector((state) => state.auth.token)

	if (token){
		return <Navigate replace to = {"/"} />
	}

	return (
		<div className = "tw-flex tw-h-screen">
			<div className = "tw-h-screen tw-flex tw-flex-1 tw-justify-center tw-items-center">
				<div className = "tw-p-8 tw-bg-gray-50 tw-shadow-md">
					<Outlet/>
				</div>
			</div>
			<div className = "tw-h-screen tw-bg-indigo-950 tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-items-center">
				<div>
					<img src = "county-library-cropped.png"/>
				</div>
				<SocialMedia/>	
			</div>
		</div>
	)
}

export default DefaultLayout
