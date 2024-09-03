import React from "react"
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
	const { pathname } = useLocation()
	const links = [
	{
		pathname: "/", text: "Home",
	},
	{
		pathname: "/books", text: "Catalog",
	},
	{
		pathname: "/locations", text: "Locations",	
	},
	{
		pathname: "/account", text: "Account",
	},
	]
	return (
		<div className = "sm:tw-px-14 md:tw-px-36 tw-flex tw-flex-row tw-py-6 tw-bg-primary">
			<div className = "tw-w-full tw-flex tw-flex-row">
				{ 
					links.map((link) => 
						<Link key={link.pathname} to={link.pathname} className = {`tw-mr-8 tw-text-white ${pathname === link.pathname ? "active" : ""}`}>
							{link.text}
						</Link>
					)
				}	
			</div>
		</div>
	)	
}