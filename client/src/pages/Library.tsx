import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux-hooks"
import { RowCard } from "../components/page-elements/RowCard"
import { IconButton } from "../components/page-elements/IconButton"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";

export const Library = () => {
	const params = useParams<{libraryId: string}>()
	const navigate = useNavigate()
	const libraryId = params.libraryId !== "" ? Number(params.libraryId) : null
	const { libraries } = useAppSelector((state) => state.library)
	const library = libraries?.find((library) => library.id === libraryId)
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
			<RowCard>
				<img className = "tw-w-full tw-h-auto lg:tw-w-1/2 lg:tw-h-1/2" src = {library?.imageURL} alt={library?.name}/>
				<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
					<div className = "tw-flex tw-flex-col tw-gap-y-2 tw-pb-2">
						<span className = "tw-overflow-hidden tw-font-bold tw-text-3xl">{library?.name}</span>
						<span></span>
					</div>
				</div>	
			</RowCard>
		</div>
	)
}
