import React from "react"

export const Container = ({children}: React.PropsWithChildren) => {
	return (
		<div className = "tw-w-full sm:tw-px-36 tw-flex tw-flex-col tw-gap-y-4">
			{children}
		</div>
	)
}