import React from "react"

export const GridCard = ({children}: React.PropsWithChildren) => {
	return (
		<div className="tw-col-span-1 tw-mx-4 md:tw-mx-0 tw-flex tw-flex-col tw-bg-white tw-border-2 tw-p-4 tw-gap-y-2">
			{children}
		</div>
	)
}