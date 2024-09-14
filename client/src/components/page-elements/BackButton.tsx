import React from "react"
import { IconContext } from "react-icons"
import { IconButton } from "./IconButton"
import { GrPrevious as Previous } from "react-icons/gr";

interface Props {
	onClick: () => void	
	text: string
}

export const BackButton = ({onClick, text}: Props) => {
	return (
		<IconButton onClick={onClick}>
			<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
	            <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
	                <Previous/> 
	            </IconContext.Provider> 
	            <span className = "tw-font-bold tw-text-lg">{text}</span>
	        </div>	
		</IconButton>
	)
}
