import React from "react"
import { IconContext } from "react-icons"
import { IconButton } from "./IconButton"
import { RiCheckboxCircleFill as CheckboxFill, RiCheckboxCircleLine as CheckboxEmpty } from "react-icons/ri";

interface Props {
	onClickCheckbox: (...args: any) => void
	isCheckboxFull: boolean
}

export const MultiSelectRowToolbar = ({onClickCheckbox, isCheckboxFull, children}: React.PropsWithChildren<Props>) => {
	return (
		<div className = "tw-flex tw-flex-row tw-justify-between lg:tw-items-center tw-gap-x-4">
			{children}
			<IconButton onClick={onClickCheckbox} className = "tw-flex tw-flex-row tw-gap-x-2 hover:tw-opacity-60 tw-text-gray-800 tw-cursor-pointer">
				<span className = "tw-font-bold">Select All</span>
				<IconContext.Provider value={{color: "black", className: "tw-w-6 tw-h-6"}}>
					{isCheckboxFull ? <CheckboxFill/> : <CheckboxEmpty/>}
		        </IconContext.Provider>
			</IconButton>
		</div>
	)
}
