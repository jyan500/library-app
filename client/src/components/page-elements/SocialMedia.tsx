import React from "react"
import { IconContext } from "react-icons"
import { FaInstagram as Instagram } from "react-icons/fa";
import { ImFacebook2 as Facebook } from "react-icons/im";
import { FaYoutube as Youtube } from "react-icons/fa";

export const SocialMedia = () => {
	return (
		<div className = "tw-my-4 tw-py-4 tw-flex tw-flex-row tw-justify-center tw-items-center">
			<a className = "tw-px-2" href = "https://www.instagram.com/smclibraries/">
				<IconContext.Provider value={{className: "tw-w-10 tw-h-10", color: "white"}}>
					<Instagram/>
				</IconContext.Provider>
			</a>
			<a className = "tw-px-2" href = "https://www.facebook.com/SMCLibraries">
				<IconContext.Provider value={{className: "tw-w-[35px] tw-h-[35px]", color: "white"}}>
					<Facebook/>
				</IconContext.Provider>
			</a>
			<a className = "tw-px-2" href = "https://www.youtube.com/user/sanmateocountylib">
				<IconContext.Provider value={{className: "tw-w-10 tw-h-10", color: "white"}}>
					<Youtube/>
				</IconContext.Provider>
				</a>
		</div>
	)	
}