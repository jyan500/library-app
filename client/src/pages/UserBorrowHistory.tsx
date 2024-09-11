import React, { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { RowBookCard } from "../components/RowBookCard"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { HOME } from "../helpers/routes"
import { v4 as uuidv4 } from "uuid"
import { IconButton } from "../components/page-elements/IconButton"
import { UserBorrowHistory as HistoryType, BookConfirmation, Toast } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetUserBorrowHistoryQuery } from "../services/private/userBorrowHistory"
import { useReturnUserBookMutation } from "../services/private/userBook"
import { addToast } from "../slices/toastSlice"
import { setCartItems, setDbCartId, setSessionEndTime } from "../slices/bookCartSlice"
import { useScreenSize } from "../hooks/useScreenSize" 
import { XL_BREAKPOINT } from "../helpers/constants"

export const UserBorrowHistory = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { libraries } = useAppSelector((state) => state.library)
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	const params = useParams<{userBorrowHistoryId: string}>()
	const userBorrowHistoryId = params.userBorrowHistoryId ? parseInt(params.userBorrowHistoryId) : undefined 
	const availableStatus = bookStatuses?.find((status) => status.name === "Available")
	const [returnUserBook, {isLoading, error}] = useReturnUserBookMutation()
	const {data, isFetching } = useGetUserBorrowHistoryQuery(userBorrowHistoryId ? {id: userBorrowHistoryId, urlParams: {"books": true}} : skipToken)
	const screenSize = useScreenSize()

	const onReturnBook = async (userBookId: number) => {
		const defaultToast: Toast = {
			id: uuidv4(),
			type: "failure",
			animationType: "animation-in",
			message: "Something went wrong! Book could not be returned."
		}
		if (availableStatus?.id && userBookId){
			try {
				await returnUserBook({id: userBookId, bookStatusId: availableStatus?.id}).unwrap()
				dispatch(addToast({...defaultToast,
					type: "success",
					message: "Book returned successfully!"
				}))
			}
			catch (e){
				dispatch(addToast(defaultToast))
			}
		}
		else {
			dispatch(addToast(defaultToast))
		}
	}

	const onBack = () => {
		navigate(-1)
	}

	return (
		<div className = "tw-px-4 tw-flex tw-flex-col tw-gap-y-2">
			<div className = "tw-flex tw-flex-col tw-gap-y-4">
				{
					screenSize.width <= XL_BREAKPOINT ? 
						<IconButton onClick={onBack}>
							<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
			                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
			                        <Previous/> 
			                    </IconContext.Provider> 
			                    <span className = "tw-font-bold tw-text-lg">Back</span>
		                    </div>	
						</IconButton>
					: null
				}
				<div>
					{data?.map((history: HistoryType) => {
						return (
							<div className = "tw-flex tw-flex-col tw-gap-y-2" key = {history.id}>
								<span className = "tw-font-bold">Transaction #{history.transactionNum}</span>	
								<span className = "tw-font-bold">{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
								<div>
									{history.books?.map((book: BookConfirmation) => {
										const dueDate = new Date(book.dateDue)
										const curDate = new Date()
										return (
											<RowBookCard 
												key={book.id}
												book={book}
											>
												<>
													<div className = "tw-border-t tw-border-gray-300"></div>
													<div>
														<span>{libraries.find((library) => library.id === book.libraryId)?.name} Library</span>
													</div>
													{
														curDate < dueDate ? (
															<>
																<div>
																	<span className = "tw-font-bold">Due Date: {dueDate.toLocaleDateString("en-US")}</span>
																</div>
																<div className = "tw-mt-auto">
																	<button onClick = {() => onReturnBook(book.userBookId)} className = "button">Return Book</button>
																</div>
															</>
														) : null
													}
												</>
											</RowBookCard>
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