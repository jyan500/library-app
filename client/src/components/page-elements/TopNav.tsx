import React from "react"
import { HamburgerButton } from "../HamburgerButton"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { logout } from "../../slices/authSlice" 
import { CgProfile } from "react-icons/cg"
import { LoadingSpinner } from "../LoadingSpinner"
import { privateApi } from "../../services/private" 
import { displayUser } from "../../helpers/functions"
import CountyLibrary from "../../assets/images/county-library-cropped.png"

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
			<div className = "tw-w-full tw-flex tw-items-center tw-justify-between tw-my-4">
				<div className = "tw-flex md:tw-shrink-0">
					<img className = "md:tw-w-4/6 md:tw-h-4/6" src = {CountyLibrary}/>
				</div>
				<div className = "tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-4">
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