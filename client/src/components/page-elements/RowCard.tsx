import React from "react"

interface Props {
	heightClass?: string
	highlightBorder?: string
}

export const RowCard = ({highlightBorder,heightClass, children}: React.PropsWithChildren<Props>) => {
	return (
		<div className = {`${heightClass ?? ""} tw-min-h-0 tw-border ${highlightBorder && highlightBorder !== "" ? "tw-border-red-500" : "tw-border-gray-300"} tw-flex tw-flex-col tw-gap-y-4 tw-p-2 xl:tw-flex-row xl:tw-gap-x-4 tw-rounded-lg tw-shadow-sm`}> 
			{children}
		</div>
	)
}