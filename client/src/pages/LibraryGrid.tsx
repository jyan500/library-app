import React from "react"
import { useAppSelector } from "../hooks/redux-hooks"
import { Library } from "../types/common"
import { LIBRARIES } from "../helpers/routes"  
import { GridCard } from "../components/GridCard"
import { Link } from "react-router-dom"

export const LibraryGrid = () => {
	const { libraries } = useAppSelector((state) => state.library)
	return (
		<div className = "tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
			{
				libraries?.map((row: Library) => {
					return (
						<GridCard key={row.id} >
							<Link to = {`${LIBRARIES}/${row.id}`}><img className = "tw-h-auto tw-w-full sm:tw-h-[280px] tw-object-cover" src = {row.imageURL} alt={row.name}/></Link>
							<div className="tw-flex tw-flex-col tw-gap-y-2">
								<span className = "tw-font-bold tw-text-2xl">{row.name}</span>
								<span>{row.address}</span>
								<span>{row.city}, {row.state} {row.zipcode}</span>
							</div>
							<div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mt-auto tw-pt-3 tw-gap-x-2">
							</div>
						</GridCard>
					)
				})
			}
		</div>
	)
}