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
import { FaBookmark as Bookmark } from "react-icons/fa";
import { CartItem } from "../types/common"
import { setCartItems } from "../slices/bookCartSlice"
import { setModalType, toggleShowModal, setModalProps } from "../slices/modalSlice"
import { Props as AddBookToCartPropType } from "../components/modals/AddBookToCartModal"
import { addToast } from "../slices/toastSlice"
import { RowBookCard } from "../components/RowBookCard"
import { v4 as uuidv4 } from "uuid"

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
	const { cartItems } = useAppSelector((state) => state.bookCart)
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

	const cartItem = cartItems.find((cItem: CartItem) => cItem?.book?.id === book?.id)
	console.log(cartItem)

	const onClickPrev = () => {
		navigate(-1)
	}

	const onAddToList = () => {
		if (bookId){
			dispatch(setModalType("ADD_BOOK_TO_CART"))
			dispatch(setModalProps<AddBookToCartPropType>({book: book, availableCopies: availableCopies ?? []}))
			dispatch(toggleShowModal(true))
		}	
	}

	const onRemoveFromList = (cartItemId: string) => {
		dispatch(setCartItems(cartItems.filter((cItem: CartItem) => cItem.cartId !== cartItemId)))
		dispatch(addToast({
			id: uuidv4(),
			type: "success",
			animationType: "animation-in",
			message: "Removed from list successfully!"
		}))
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
							<RowBookCard book={book}>
								<>
									<div className = "tw-border-t tw-border-gray-300"></div>
							 		<div>
							 			<span className = {`tw-text-xl ${availableCopies?.length ? "tw-text-green-700" : "tw-text-red-700"}`}>{availableCopies?.length ? "Available" : "All Copies In Use"}</span>
							 		</div>
							 		<div className = "tw-flex tw-flex-row tw-gap-x-4">
							 			<p className = "tw-text-lg"><strong>{bookAvailabilityData?.length}</strong> Copies</p>
							 			<p className = "tw-text-lg"><strong>{availableCopies?.length} </strong> Available</p>
							 			<p className = "tw-text-lg"><strong>{onHoldCopies?.length} </strong> On Hold</p>
							 		</div>
							 		<div>
							 			{availableCopies?.length ? (
											!cartItem ? (
												<button onClick={onAddToList} className = "button">
													<div className = "tw-flex tw-flex-row tw-items-center tw-gap-x-2">		
														<IconContext.Provider value = {{color: "white", className: "tw-w-4 tw-h-4"}}>
									                        <Bookmark/> 
									                    </IconContext.Provider> 
														<span>Add to List</span>
													</div>
												</button>
											) : (
												<button onClick={() => onRemoveFromList(cartItem.cartId)} className = "button --alert">
													<div className = "tw-flex tw-flex-row tw-items-center tw-gap-x-2">
														<IconContext.Provider value = {{color: "white", className: "tw-w-4 tw-h-4"}}>
									                        <Bookmark/> 
									                    </IconContext.Provider> 
														<span>Remove from List</span>
													</div>
												</button>
											)
										) : null}
									</div>
									<div className = "tw-mt-auto tw-space-y-2">
										<div><span className = "tw-font-bold">Genre</span></div>
										<div className = "tw-inline-block tw-text-sm tw-p-2 tw-bg-primary tw-rounded-lg"><span className = "tw-text-white">{genres?.find((genre) => genre.id === book?.genreId)?.name}</span></div>
									</div>
								</>
							</RowBookCard>
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