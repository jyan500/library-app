import React, {useState} from "react"
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
	const { pathname } = useLocation()
	const links = [
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
		// <nav className = "tw-px-14 md:tw-px-36 tw-flex tw-flex-row tw-py-6 tw-bg-primary">
		// 	<ul className = "tw-w-full tw-flex tw-flex-row">
		// 		{ 
		// 			links.map((link) => {
		// 				return link.secondary.length ? (
		// 					<li className = "tw-relative tw-group">
		// 						<Link to={link.pathname} className = "tw-mr-8 tw-text-white">{link.text}</Link>	
		// 						<ul className="tw-absolute tw-invisible group-hover:visible tw-opacity-0 group-hover:opacity-100 tw-transition-opacity tw-duration-300 tw-bg-white tw-text-gray-800 tw-py-2 tw-rounded-lg tw-shadow-lg tw-w-48">
		// 							{
		// 								link.secondary.map((secondaryLink) => {
		// 									return (
		// 										<Link to={secondaryLink.pathname}>{secondaryLink.text}</Link>
		// 									)
		// 								})
		// 							}
		// 						</ul>
		// 					</li>	
		// 				) : (
		// 					<li>
		// 						<Link key={link.pathname} to={link.pathname} className = {`tw-mr-8 tw-text-white`}>
		// 							{link.text}
		// 						</Link>
		// 					</li>
		// 				)
		// 			})
		// 		}	
		// 	</ul>
		// </nav>
		  <nav className="tw-px-14 md:tw-px-36 tw-h-16 tw-bg-primary">
      <ul className="tw-h-full tw-flex tw-items-center tw-space-x-4">
        <li className="tw-h-full tw-flex tw-items-center tw-relative tw-group">
          <a href="#" className="tw-text-white">
            Services
          </a>
          {/* Dropdown menu */}
          <ul className="tw-top-16 tw-absolute tw-invisible group-hover:tw-visible tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-bg-gray-800 tw-text-white tw-py-2 tw-rounded-lg tw-shadow-lg tw-w-48">
            <li>
              <a href="#" className="tw-block hover:tw-text-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-text-white">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="tw-block hover:tw-text-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-text-white">
                Mobile Development
              </a>
            </li>
            <li>
              <a href="#" className="tw-block hover:tw-text-gray-50 tw-px-4 tw-py-2 tw-text-sm tw-text-white">
                UI/UX Design
              </a>
            </li>
          </ul>
        </li>
        <li className = "tw-h-full tw-flex tw-items-center">
          <a href="#" className="tw-text-white">
            About
          </a>
        </li>
        <li className = "tw-h-full tw-flex tw-items-center">
          <a href="#" className="tw-text-white">
            Contact
          </a>
        </li>
      </ul>
    </nav>
	)	
}