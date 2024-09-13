import React from "react"
import { IconContext } from "react-icons"
import { IconButton } from "./IconButton"
import { RiCheckboxCircleFill as CheckboxFill, RiCheckboxCircleLine as CheckboxEmpty } from "react-icons/ri";
import { MultiSelectRowType } from "../../types/common"

interface Props<T={}> {
	item: T
	onClick: () => void
	isCheckboxFill: boolean
}

export const MultiSelectRow = ({item, onClick, isCheckboxFill, children}: React.PropsWithChildren<Props<MultiSelectRowType>>) => {
	return (
		<div key={item.id} onClick={onClick} className = "tw-relative hover:tw-cursor-pointer hover:tw-bg-gray-50">
			{children}
			<IconButton onClick={onClick} className = "tw-absolute tw-top-3 tw-right-3 hover:tw-opacity-60 tw-text-gray-800 tw-cursor-pointer">
				<IconContext.Provider value={{color: "black", className: "tw-w-6 tw-h-6"}}>
					{isCheckboxFill ? <CheckboxFill/> : <CheckboxEmpty/>}
		        </IconContext.Provider>
			</IconButton>
		</div>	
	)
}