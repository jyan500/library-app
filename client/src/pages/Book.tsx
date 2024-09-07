import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom" 
import { 
	useGetBookQuery ,
	useGetLibrariesFromBookQuery
} from "../services/private/book"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { useLocation, useNavigate } from "react-router-dom"
import { Book as BookType, LibraryBook } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { BOOKS_SEARCH, BOOKS_BROWSE } from "../helpers/routes"
import { useLibraryBookConfig } from "../helpers/table-config/useLibraryBookConfig" 
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { Table } from "../components/Table"

export const Book = () => {
	const params = useParams<{bookId: string}>()
	const navigate = useNavigate()

	const bookId = params.bookId ? parseInt(params.bookId) : undefined 
	const {data: bookData, isFetching: isBookFetching} = useGetBookQuery(bookId ?? skipToken) 
	const {data: bookAvailabilityData, isFetching: isAvailabilityFetching} = useGetLibrariesFromBookQuery(bookId ?? skipToken)
	const book = bookData?.length ? bookData[0] : null
	const { libraries } = useAppSelector((state) => state.library)
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	const { genres } = useAppSelector((state) => state.genre)
	const dispatch = useAppDispatch()
	
	// show two tables, one where dueDate shows and where one does not show (for available books)	
	const libraryBookConfig = useLibraryBookConfig()
	const {dateDue: _, ...availableRowHeaders} = libraryBookConfig.headers
	const {dateDue: __, ...availableRowModifiers} = libraryBookConfig.modifiers
	const availableBookConfig = {link: libraryBookConfig.link, linkCol: libraryBookConfig.linkCol, "headers": availableRowHeaders, "modifiers": availableRowModifiers}

	const availableStatus = bookStatuses?.find((status) => status.name === "Available")
	const onHoldStatus = bookStatuses?.find((status) => status.name === "On Hold")

	const availableCopies = bookAvailabilityData?.filter((libraryBook: LibraryBook) => libraryBook.bookStatusId === availableStatus?.id)
	const onHoldCopies = bookAvailabilityData?.filter((libraryBook: LibraryBook) => libraryBook.bookStatusId === onHoldStatus?.id)
	const notAvailableCopies = bookAvailabilityData?.filter((libraryBook: LibraryBook) => libraryBook.bookStatusId !== availableStatus?.id)

	const onClickPrev = () => {
		navigate(-1)
	}

	return (
		<>
			<div className = "tw-flex tw-flex-col tw-justify-center tw-gap-y-4 tw-p-4">
				<div>
					<button
	                    className="hover:tw-opacity-60 tw-bg-white tw-text-gray-800 tw-cursor-pointer"
	                    onClick={onClickPrev}
	                >
	                	<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
		                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
		                        <Previous/> 
		                    </IconContext.Provider> 
		                    <span className = "tw-font-bold tw-text-lg">Back to Results</span>
	                    </div>
	                </button>

				</div>
				<div>
					{
						!isBookFetching && bookData?.length ? (
							<div className = "tw-flex tw-flex-col tw-gap-y-4 sm:tw-flex-row sm:tw-gap-x-4">
								<div>
									<img className = "tw-h-auto tw-w-full tw-object-cover" src = {book?.imageURL}/>
								</div>
								<div className = "tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg tw-shadow-sm tw-flex tw-flex-col tw-gap-y-2">
									<div className = "tw-border-b tw-border-gray-300 tw-flex tw-flex-col tw-gap-y-2 tw-pb-2">
										<span className = "tw-font-bold tw-text-3xl">{book?.title}</span>
										<span className = "tw-text-2xl">{book?.author}</span>
									</div>
									<div>
										<span className = {`tw-text-xl ${availableCopies?.length ? "tw-text-green-700" : "tw-text-red-700"}`}>{availableCopies?.length ? "Available" : "All Copies In Use"}</span>
									</div>
									<div className = "tw-flex tw-flex-row tw-gap-x-4">
										<p className = "tw-text-lg"><strong>{bookAvailabilityData?.length}</strong> Copies</p>
										<p className = "tw-text-lg"><strong>{availableCopies?.length} </strong> Available</p>
										<p className = "tw-text-lg"><strong>{onHoldCopies?.length} </strong> On Hold</p>
									</div>
									<div>
										{availableCopies?.length ? (<button className = "button">Check Out</button>) : null}
									</div>
									<div className = "tw-mt-auto tw-space-y-2">
										<div><span className = "tw-font-bold">Genre</span></div>
										<div className = "tw-inline-block tw-text-sm tw-p-2 tw-bg-primary tw-rounded-lg"><span className = "tw-text-white">{genres?.find((genre) => genre.id === book?.genreId)?.name}</span></div>
									</div>
								</div>
							</div>
						) : null
					}
				</div>
				<div className = "tw-space-y-4">
					{
						!isAvailabilityFetching && availableCopies?.length ? (
							<div className = "tw-space-y-2">
								<span className = "tw-text-3xl font-bold">Available</span>
								<Table data={availableCopies ?? []} config={availableBookConfig}/>	
							</div>
						) : null
					}
					{
						!isAvailabilityFetching && notAvailableCopies?.length ? (
							<div className = "tw-space-y-2">
								<span className = "tw-text-3xl font-bold">Not Available</span>
								<Table data={notAvailableCopies ?? []} config={libraryBookConfig}/>	
							</div>
						) : null
					}
				</div>
			</div>
		</>
	)
}