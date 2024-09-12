import React from "react"

export interface WarningModalProps {
	message: string
	onSubmit: () => void
	onCancel: () => void
}

export const WarningModal = ({message, onSubmit, onCancel}: WarningModalProps) => {
	return (
		<div className = "tw-flex tw-flex tw-px-4 tw-gap-y-4"></div>
	)
}