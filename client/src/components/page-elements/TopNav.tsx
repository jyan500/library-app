import React from "react"
import { HamburgerButton } from "../HamburgerButton"
import "../../styles/topnav.css"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { logout } from "../../slices/authSlice" 
import { CgProfile } from "react-icons/cg"
import { LoadingSpinner } from "../LoadingSpinner"
import { privateApi } from "../../services/private" 
import { displayUser } from "../../helpers/functions"

interface Props {
	isFetching: boolean
}

export const TopNav = ({isFetching}: Props) => {
	const dispatch = useAppDispatch()
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const { token } = useAppSelector((state) => state.auth)
	const onLogout = () => {
		dispatch(logout())
		dispatch(privateApi.util.resetApiState())

	}
	return (
		<div className = "tw-px-10 md:tw-px-32 tw-flex tw-flex-row">
			<div className = "tw-w-full topnav">
				<div className = "tw-flex tw-shrink-0">
					<img className = "tw-w-1/2 tw-h-1/2 md:tw-w-4/6 md:tw-h-4/6" src = {"county-library-cropped.png"}/>
				</div>
				<div className = "topnav-profile">
					{!isFetching ? (
						<>
							<div>
								<CgProfile className = "--l-icon"/>
							</div>
							<div>
								<span>{displayUser(userProfile)}</span>
							</div>
						</>
					) : (
						<LoadingSpinner className = "tw-w-10 tw-h-10"/>
					)}
					<div>
						<button className = "button" onClick={onLogout}>Logout</button>
					</div>
				</div>
			</div>
		</div>
	)
}