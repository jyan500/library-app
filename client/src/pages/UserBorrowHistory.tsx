import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { BookDetailRowCard } from "../components/books/BookDetailRowCard"
import { HOME } from "../helpers/routes"
import { v4 as uuidv4 } from "uuid"
import { UserBorrowHistory as HistoryType, BookConfirmation, Toast } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetUserBorrowHistoryQuery } from "../services/private/userBorrowHistory"
import { addToast } from "../slices/toastSlice"
import { setCartItems, setDbCartId, setSessionEndTime } from "../slices/bookCartSlice"
import { toggleShowModal, setModalType, setModalProps } from "../slices/modalSlice"
import { ReturnBookModalProps } from "../components/modals/ReturnBookModal"
import { RiCheckboxCircleFill as CheckboxFill, RiCheckboxCircleLine as CheckboxEmpty } from "react-icons/ri";
import { MultiSelectRow } from "../components/page-elements/MultiSelectRow"
import { MultiSelectRowToolbar } from "../components/page-elements/MultiSelectRowToolbar"
import { useScreenSize } from "../hooks/useScreenSize" 
import { XL_BREAKPOINT } from "../helpers/constants"
import { BackButton } from "../components/page-elements/BackButton"

export const UserBorrowHistory = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { libraries } = useAppSelector((state) => state.library)
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	const params = useParams<{userBorrowHistoryId: string}>()
	const [ booksToReturn, setBooksToReturn ] = useState<Array<BookConfirmation>>([])
	const userBorrowHistoryId = params.userBorrowHistoryId ? parseInt(params.userBorrowHistoryId) : undefined 
	const availableStatus = bookStatuses?.find((status) => status.name === "Available")
	const {data, isFetching } = useGetUserBorrowHistoryQuery(userBorrowHistoryId ? {id: userBorrowHistoryId, urlParams: {"books": true}} : skipToken)
	const screenSize = useScreenSize()

	const onShowModal = () => {
		dispatch(setModalProps<ReturnBookModalProps>({
			books: booksToReturn
		}))
		dispatch(toggleShowModal(true))
		dispatch(setModalType("RETURN_BOOK_MODAL"))
	}

	const onClickSetBooksToReturn = (book: BookConfirmation) => {
		const existing = booksToReturn.find((b) => b.id === book.id)
		if (existing){
			setBooksToReturn(booksToReturn.filter((b) => b.id !== book.id))
		}
		else {
			setBooksToReturn([...booksToReturn, book])
		}
	}

	const onClickSetAllBooksToReturn = (historyId: number, books: Array<BookConfirmation>) => {
		const history = data?.find((hist: HistoryType) => hist.id === historyId)
		if (history){
			if (history.books.length !== booksToReturn.length){
				setBooksToReturn(history.books?.length ? history.books : [])
			}
			else {
				setBooksToReturn([])
			}
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
						<BackButton onClick={onBack} text={"Back"}/>
					: null
				}
				<div>
					{data?.map((history: HistoryType) => {
						return (
							<div className = "tw-flex tw-flex-col tw-gap-y-4" key = {history.id}>
								<div className = "tw-border tw-border-gray-300 tw-pl-4 tw-py-4 tw-pr-3 tw-shadow-md tw-rounded-md tw-flex tw-flex-col tw-gap-y-4 ">
									<div className = "tw-flex tw-flex-col tw-gap-y-2">
										<span className = "tw-font-bold">Transaction #{history.transactionNum}</span>	
										<span className = "tw-font-bold">{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
										<span>Click the checkmarks to select books</span>
									</div>
								</div>
								<div className = "tw-pr-3">
									<MultiSelectRowToolbar 
										onClickCheckbox={() => onClickSetAllBooksToReturn(history.id, history.books?.length ? history.books : [])}
										isCheckboxFull={booksToReturn.length === history.books?.length}
									>
										<div className = {`${booksToReturn.length ? "tw-visible": "tw-invisible"}`}>
											<button onClick={() => onShowModal()} className = "button">Return {booksToReturn.length} {booksToReturn.length > 1 ? "Books" : "Book"}</button>
										</div>
									</MultiSelectRowToolbar>
								</div>
								<div className = "tw-flex tw-flex-col tw-gap-y-2">
									{history.books?.map((book: BookConfirmation) => {
										const dueDate = new Date(book.dateDue)
										const curDate = new Date()
										let dateReturned = new Date()
										if (book.dateReturned){
											dateReturned = new Date(book.dateReturned)
										}
										return (
											<MultiSelectRow 
											key={book.id} 
											item={book}
											onClick={() => onClickSetBooksToReturn(book)} 
											isCheckboxFill={
												booksToReturn.find((b: BookConfirmation) => b.id === book.id) != null
											}>
												<BookDetailRowCard 
													book={book}
													showLinkTitle={true}
													showOnlyChildren={screenSize.width <= XL_BREAKPOINT}
												>
													<>
														{screenSize.width > XL_BREAKPOINT ? (<div className = "tw-border-t tw-border-gray-300"></div>) : null}
														<div>
															<span>{libraries.find((library) => library.id === book.libraryId)?.name} Library</span>
														</div>
														{
															!book.dateReturned ? (
																<div>
																	<span className = "tw-font-bold">Due Date: {dueDate.toLocaleDateString("en-US")}</span>
																</div>
															) : (
																<div>
																	<span className = "tw-font-bold">Date Returned: {dateReturned.toLocaleDateString("en-US")}</span>
																</div>
															)
														}
													</>
												</BookDetailRowCard>
											</MultiSelectRow>
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