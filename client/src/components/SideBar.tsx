import React from "react"
import "../styles/sidebar.css"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { toggleSideBar } from "../slices/navSlice" 
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { LoadingSpinner } from "./LoadingSpinner" 
import { displayUser } from "../helpers/functions"

interface Props {
	isFetching: boolean
}

export const SideBar = ({isFetching}: Props) => {
	const sideBar = useAppSelector((state) => state.nav)
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const dispatch = useAppDispatch()
	const { pathname } = useLocation()
	const links = [
	{
		pathname: "/", text: "Home",
	},
	{
		pathname: "/books", text: "Books",
	},
	{
		pathname: "/account", text: "Account",
	},
	]
	return (
		<div className = {`sidebar --card-shadow --transition-transform ${sideBar.showSidebar ? "--translate-x-0" : "--translate-x-full-negative"}`}>
			<button 
				className = "close-button --transparent"
				onClick={
					() => {
						dispatch(toggleSideBar(false))
					}
				}
				>
			<IoMdClose className = "icon"/></button>	
			<div className = "sidebar__container">
				<div>
					<img src = "county-library.png"/>
				</div>
				<div className = "sidebar__links">
					{ 
						links.map((link) => 
							<Link key={link.pathname} onClick={(e) => dispatch(toggleSideBar(false))} to={link.pathname} className = {`${pathname === link.pathname ? "active" : ""}`}>
								{link.text}
							</Link>
						)
					}
				</div>
				<div className = "sidebar__bottom-bar">
					<div className = "sidebar__bottom-bar__content">
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
							<LoadingSpinner/>
						)}
					</div>
				</div>
			</div>
		</div>
	)	
}