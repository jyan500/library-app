import React, { PropsWithChildren } from "react"

interface Props {
	className?: string
}

export const PageHeader = (props: PropsWithChildren<Props>) => {
	return (
		<div className = {`${props.className ?? "tw-px-14 sm:tw-px-36 tw-py-14 tw-bg-primary"}`}>
			{props.children}
		</div>
	)
}