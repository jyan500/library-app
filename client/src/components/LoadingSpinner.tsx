import React from "react"
import "../styles/loading-spinner.css"

interface Props {
	className?: string
}

export const LoadingSpinner = ({className}: Props) => {
	return (
		<div className = {`spinner ${className ?? "tw-m-16 tw-w-20 tw-h-20"}`}></div>
	)	
}