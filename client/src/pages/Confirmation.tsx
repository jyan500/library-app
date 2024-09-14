import React, { useEffect } from "react"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { BookDetailRowCard } from "../components/books/BookDetailRowCard"
import { HOME } from "../helpers/routes"
import { v4 as uuidv4 } from "uuid"
import { UserBorrowHistory, BookConfirmation } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetUserBorrowHistoryQuery } from "../services/private/userBorrowHistory"
import { setCartItems, setDbCartId, setSessionEndTime } from "../slices/bookCartSlice"
import { useScreenSize } from "../hooks/useScreenSize"
import { XL_BREAKPOINT } from "../helpers/constants"
import { ArrowButton } from "../components/page-elements/ArrowButton"

export const Confirmation = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const {data, isFetching } = useGetUserBorrowHistoryQuery({id: location.state.userBorrowHistoryId, urlParams: {"books": true}} ?? skipToken)
	const { libraries } = useAppSelector((state) => state.library)

	const onClickHome = () => {
		// clear the db cart session id 
		dispatch(setDbCartId(null))
		dispatch(setSessionEndTime(null))
		navigate(HOME, {replace: true})
	}

	return (
		<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
			<div>
				<ArrowButton onClick={() => onClickHome()} text={"Return to Home"}/>
			</div>
			<div className = "tw-py-4 tw-flex tw-flex-col tw-gap-y-4">
				<span className = "tw-font-bold tw-text-3xl">Confirmation</span>
				<div className = "tw-border-t tw-border-gray-300"></div>
				<div>
					{data?.map((history: UserBorrowHistory) => {
						return (
							<div className = "tw-flex tw-flex-col tw-gap-y-2" key = {history.id}>
								<span className = "tw-font-bold">Transaction #{history.transactionNum}</span>	
								<span className = "tw-font-bold">{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
								<div>
									{history.books?.map((book: BookConfirmation) => {
										return (
											<BookDetailRowCard 
												key={book.id}
												book={book}
											>
												<>
													<div className = "tw-border-t tw-border-gray-300"></div>
													<div>
														<span>{libraries.find((library) => library.id === book.libraryId)?.name} Library</span>
													</div>
													<div>
														<span className = "tw-font-bold">Due Date: {new Date(book.dateDue).toLocaleDateString("en-US")}</span>
													</div>
												</>
											</BookDetailRowCard>
										)	
									})}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		
		</div>
	)	
}