import React from "react"
import { HamburgerButton } from "../HamburgerButton"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks"
import { logout } from "../../slices/authSlice" 
import { CgProfile } from "react-icons/cg"
import { LoadingSpinner } from "../LoadingSpinner"
import { privateApi } from "../../services/private" 
import { Link } from "react-router-dom"
import { displayUser } from "../../helpers/functions"
import CountyLibrary from "../../assets/images/county-library-cropped.png"
import { FaBookmark as Bookmark } from "react-icons/fa";
import { HOME, ACCOUNT } from "../../helpers/routes"
import { IconContext } from "react-icons"
import { IconButton } from "./IconButton"
import { setModalType, setModalProps, toggleShowModal } from "../../slices/modalSlice"

interface Props {
	isFetching: boolean
}

export const TopNav = ({isFetching}: Props) => {
	const dispatch = useAppDispatch()
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const { token } = useAppSelector((state) => state.auth)
	const { cartItems } = useAppSelector((state) => state.bookCart)

	const showCart = () => {
		dispatch(setModalType("BOOK_CART_MODAL"))
		dispatch(toggleShowModal(true))
	}

	const onLogout = () => {
		dispatch(logout())
		dispatch(privateApi.util.resetApiState())
	}

	return (
		<div className = "tw-px-2 sm:tw-px-32 tw-flex tw-flex-row">
			<div className = "tw-w-full tw-flex tw-items-center tw-justify-between tw-my-4">
				<div className = "tw-flex sm:tw-shrink-0">
					<Link className = "tw-w-full tw-h-full" to = {HOME}><img className = "sm:tw-w-4/6 sm:tw-h-4/6" src = {CountyLibrary}/></Link>
				</div>
				<div className = "tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-4">
					{!isFetching ? (
						<div className = "tw-flex tw-flex-row tw-items-center tw-gap-x-4">
							<IconButton onClick = {showCart}>
								<div className="tw-relative tw-inline-block tw-cursor-pointer">
								    <IconContext.Provider value = {{color: "var(--bs-primary)", className: "tw-mr-1 tw-w-8 tw-h-8"}}>
				                        <Bookmark/> 
				                    </IconContext.Provider> 
					            {
					            	cartItems?.length ? 
								      (<span className="tw-absolute tw-bottom-0 tw-right-0 tw-bg-red-500 tw-text-white tw-rounded-full tw-text-xs tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-font-bold">
								      	{cartItems.length}
								      </span>) : null
								}
							    </div>
							</IconButton>	
							<div>
								<Link to = {ACCOUNT}>{displayUser(userProfile)}</Link>
							</div>
						</div>
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