import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux-hooks"
import { RowCard } from "../components/page-elements/RowCard"
import { IconButton } from "../components/page-elements/IconButton"
import { IconContext } from "react-icons"
import { useGetLibraryQuery } from "../services/public/library"
import { GrPrevious as Previous } from "react-icons/gr";
import { DAYS_REVERSE_MAPPING, DAYS } from "../helpers/constants"
import { skipToken } from "@reduxjs/toolkit/query/react"
import { convertMilitaryToStandardTime, showLibraryHourStatus } from "../helpers/functions"

export const Library = () => {
	const params = useParams<{libraryId: string}>()
	const navigate = useNavigate()
	const libraryId = params.libraryId !== "" ? Number(params.libraryId) : null
	const { data, isFetching } = useGetLibraryQuery(libraryId ? {id: libraryId, urlParams: {hours: true}} : skipToken)
	const library = data?.[0]
	return (
		<div className = "tw-flex tw-flex-col tw-gap-y-4">
			<IconButton onClick={() => navigate(-1)}>
				<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
                        <Previous/> 
                    </IconContext.Provider> 
                    <span className = "tw-font-bold tw-text-lg">Back</span>
                </div>	
			</IconButton>
			{!isFetching && data?.length ? (
				<RowCard>
					<img className = "tw-w-full tw-h-auto xl:tw-w-1/2 xl:tw-h-1/2" src = {library?.imageURL} alt={library?.name}/>
					<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
						<div className = "tw-flex tw-flex-col tw-gap-y-2 tw-pb-2">
							<span className = "tw-overflow-hidden tw-font-bold tw-text-3xl">{library?.name}</span>
							<span className = {`tw-font-bold ${library?.libraryHourStatus?.isOpen ? "tw-text-green-700" : "tw-text-red-700"}`}>{library?.libraryHourStatus ? showLibraryHourStatus(library.libraryHourStatus) : ""}</span>
							<div className = "tw-flex tw-flex-col tw-gap-y-2">
								{Object.keys(DAYS_REVERSE_MAPPING).map((day) => {
									const dayIndex = DAYS_REVERSE_MAPPING[day as keyof typeof DAYS_REVERSE_MAPPING]
									const hour = library?.hours?.find((lib) => lib.day === dayIndex)
									return (
										<div className = "tw-flex tw-flex-row tw-justify-between tw-gap-x-2">
											<span>{day}</span>
											<span>{hour ? `${convertMilitaryToStandardTime(hour.startHour)} - ${ convertMilitaryToStandardTime((hour.endHour))}` : <span className = "tw-font-bold tw-text-red-700">{"Closed"}</span>}</span>
										</div>	
									)
								})}
							</div>
						</div>
					</div>	
					<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
						<div className = "tw-flex tw-flex-col">
							<span>{library?.address}</span>
							<span>{library?.city}, {library?.state} {library?.zipcode}</span>
							<a className = "tw-font-bold tw-text-primary" href = {`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${library?.address} ${library?.city} ${library?.state} ${library?.zipcode}`)}`}>Get Directions</a>
						</div>
						<div className = "tw-flex tw-flex-col">
							<span><span className = "tw-font-bold">Email: </span>{library?.email}</span>
							<span><span className = "tw-font-bold">Phone: </span>{library?.phoneNum}</span>
						</div>
					</div>
				</RowCard>
			) : null}
		</div>
	)
}
