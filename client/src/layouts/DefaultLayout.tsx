import React from "react"
import { Link, Outlet, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { SocialMedia } from "../components/page-elements/SocialMedia" 
import CountyLibrary from "../assets/images/county-library-cropped.png"
import { IconContext } from "react-icons" 

const DefaultLayout = () => {
	const token = useAppSelector((state) => state.auth.token)

	if (token){
		return <Navigate replace to = {"/"} />
	}

	return (
		<div className = "tw-flex tw-h-screen tw-flex-col sm:tw-flex-row tw-my-4 sm:tw-my-0">
			<div className = "tw-min-h-screen sm:tw-h-screen tw-flex tw-flex-1 tw-justify-center tw-items-center">
				<div className = "tw-p-8 tw-bg-gray-50 tw-shadow-md tw-w-full sm:tw-w-[400px]">
					<Outlet/>
				</div>
			</div>
			<div className = "tw-px-4 tw-pt-4 sm:tw-px-0 sm:tw-pt-0 tw-h-screen tw-bg-indigo-950 tw-flex tw-flex-1 tw-flex-col tw-justify-center tw-items-center">
				<div>
					<img src = {CountyLibrary}/>
				</div>
				<SocialMedia/>	
			</div>
		</div>
	)
}

export default DefaultLayout
