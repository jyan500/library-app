import React, { useEffect } from "react"
import { Link, Outlet, useLocation } from "react-router-dom" 
import { PageHeader } from "../components/page-elements/PageHeader" 
import { Container } from "../components/page-elements/Container"

export const LibraryDisplay = () => {
	return (
		<div className = "tw-w-full tw-flex tw-flex-col tw-mt-4 tw-gap-y-4">
			<PageHeader>
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Locations</p>	
				<p className = "tw-text-white">Find your local library!</p>
			</PageHeader>
			<Container>
				<Outlet/>
			</Container>
		</div>
	)
}