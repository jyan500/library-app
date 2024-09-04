import React, {useState} from "react"
import { Link, useLocation } from 'react-router-dom';

type Link = {
	pathname: string	
	text: string
	secondary?: Array<Link>
}

type DropdownProps = {
	links: Array<Link>
}

const NavBarDropdown = ({links}: DropdownProps) => {
	return (
		 <ul className="tw-top-16 tw-absolute tw-invisible group-hover:tw-visible tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-bg-gray-800 tw-text-white tw-py-2 tw-rounded-b-lg tw-shadow-lg tw-w-48">
			{links.map((link) => {
				return (
				<li>
	            	<Link to={link.pathname} className="tw-block hover:tw-text-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-text-white">
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
		pathname: "/", text: "Home", secondary: []
	},
	{
		pathname: "/books", text: "Books", secondary: [
			{
				pathname: "/books/browse", text: "Browse"
			}, 
			{
				pathname: "/books/catalog", text: "Catalog"
			}]
		},
	{
		pathname: "/locations", text: "Locations", secondary: [],
	},
	{
		pathname: "/account", text: "Account", secondary: []
	},
	]
	return (
		<nav className="tw-px-14 md:tw-px-36 tw-h-16 tw-bg-primary">
	    	<ul className="tw-h-full tw-flex tw-items-center tw-space-x-4">
	        	{
	        		links.map((link) => {
	        			if (link.secondary?.length){
	        				return (
						        <li className="tw-h-full tw-flex tw-items-center tw-relative tw-group">
						        	<Link to={link.pathname} className = "tw-text-white">{link.text}</Link>
						        	<NavBarDropdown links={link.secondary ?? []}/>
						        </li>
	    					)
	        			}
	        			else {
		        			return (
		        				<li className = "tw-h-full tw-flex tw-items-center">
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