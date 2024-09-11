import React, {useState} from "react"
import { Link, useLocation } from 'react-router-dom';
import { HOME, BOOKS, USER_BORROW_HISTORY, LOCATIONS, ACCOUNT } from "../../helpers/routes"

interface Link {
	pathname: string	
	text: string
	secondary?: Array<Link>
}

interface DropdownProps {
	links: Array<Link>
}

const NavBarDropdown = ({links}: DropdownProps) => {
	return (
		 <ul className="tw-top-16 tw-absolute tw-invisible group-hover:tw-visible tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-bg-white tw-text-white tw-py-2 tw-rounded-b-lg tw-shadow-lg tw-w-48">
			{links.map((link) => {
				return (
				<li key = {link.pathname}>
	            	<Link to={link.pathname} className="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-black">
	            	{link.text}
	            	</Link>
	            </li>	
				)	
			})}				            
		</ul>
	)
}

export const NavBar = () => {
	const { pathname } = useLocation()
	const links: Array<Link> = [
	{
		pathname: HOME, text: "Home", secondary: []
},
	{
		pathname: "#", text: "Books", secondary: [
			{
				pathname: USER_BORROW_HISTORY, text: "My Books"
			}, 
			{
				pathname: BOOKS, text: "Search"
			}]
		},
	{
		pathname: LOCATIONS, text: "Locations", secondary: [],
	},
	{
		pathname: ACCOUNT, text: "Account", secondary: []
	},
	]
	return (
		<nav className="tw-px-14 sm:tw-px-36 tw-h-16 tw-bg-primary">
	    	<ul className="tw-h-full tw-flex tw-items-center tw-space-x-4">
	        	{
	        		links.map((link) => {
	        			if (link.secondary?.length){
	        				return (
						        <li key = {link.pathname} className="tw-h-full tw-flex tw-items-center tw-relative tw-group">
						        	<Link to={link.pathname} className = "tw-text-white">{link.text}</Link>
						        	<NavBarDropdown links={link.secondary ?? []}/>
						        </li>
	    					)
	        			}
	        			else {
		        			return (
		        				<li key = {link.pathname} className = "tw-h-full tw-flex tw-items-center">
							        <Link to={link.pathname} className="tw-text-white">
								        {link.text}
							        </Link>
						    	</li>
		        			)
	        			}
	        		})
	        	}
	    	</ul>
	    </nav>
	)	
}