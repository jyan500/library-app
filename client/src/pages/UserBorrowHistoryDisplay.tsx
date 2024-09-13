import React, {useState, useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Container } from "../components/page-elements/Container"
import { PageHeader } from "../components/page-elements/PageHeader"
import { PaginationRow } from "../components/page-elements/PaginationRow"
import { UserBorrowHistory } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetUserBorrowHistoriesQuery } from "../services/private/userBorrowHistory"
import { USER_BORROW_HISTORY } from "../helpers/routes"
import { useScreenSize } from "../hooks/useScreenSize"
import { XL_BREAKPOINT } from "../helpers/constants"

export const UserBorrowHistoryDisplay = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const params = useParams<{userBorrowHistoryId: string}>()
	const [searchParams, setSearchParams] = useSearchParams()
	const {data, isFetching } = useGetUserBorrowHistoriesQuery({page: searchParams.get("page") ?? 1})
	const userBorrowHistoryId = params.userBorrowHistoryId ? parseInt(params.userBorrowHistoryId) : undefined 
	const url = `${USER_BORROW_HISTORY}${userBorrowHistoryId ? `/${userBorrowHistoryId}` : ""}`
	const screenSize = useScreenSize()

	useEffect(() => {
		if (screenSize.width >= XL_BREAKPOINT){
	        // If items are loaded and the user visits "/items" directly, redirect to the first item
		    if (data && data.data?.length > 0) {
		    	showHistory(data.data?.[0].id)
		    }
		}
	}, [data, navigate]);

	const showHistory = (id: number) => {
		const pageUrl = `${USER_BORROW_HISTORY}/${id}?page=${searchParams.get("page") ?? 1}`
		navigate(pageUrl)
	}

	const setPage = (pageNum: number) => {
		const pageUrl = `${USER_BORROW_HISTORY}${userBorrowHistoryId ? `/${userBorrowHistoryId}` : ""}?page=${pageNum}`
	    navigate(pageUrl, {replace:true});
	}

	/* 
		show the transactions on the left side, and the transaction details on the right side when clicked
		for large screen sizes
	*/
	const rowView = () => {
		return (
			<>
				<div className = "tw-w-1/4 tw-flex tw-flex-col tw-gap-y-4">
					<div className = "tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg">
						<PaginationRow
							showPageNums={false}
							currentPage={searchParams.get("page") ? Number(searchParams.get("page")) : 1}
							paginationData={data?.pagination}
							setPage={setPage}
						/>
					</div>
					{data?.data?.map((history: UserBorrowHistory) => {
						return (
							<button key = {history.id} onClick={() => showHistory(history.id)} className = "hover:tw-bg-gray-50">
								<div className = "tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg tw-p-4 tw-flex tw-flex-col tw-gap-y-2" key = {history.id}>
									<span><span className = "tw-font-bold">Transaction #:</span> {history.transactionNum}</span>
									<span><span className = "tw-font-bold">On: </span>{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
								</div>
							</button>
						)
					})}
				
				</div>
				<div className = "tw-w-3/4 tw-flex tw-flex-col tw-gap-y-4">
					{ !userBorrowHistoryId ? (
						<span className = "tw-font-bold tw-text">Click on the transaction number to view details</span>
						) : null
					}
					<Outlet/>
				</div>
			</>
		)
	}

	/* 
		for smaller screen sizes, show the transactions, and then when a transaction is clicked, the detail
		will then show in a new page (and the other transactions will be hidden)
	*/
	const mobileView = () => {
		return (<>
			{!userBorrowHistoryId ? (
				<div className = "tw-flex tw-w-full tw-flex-col tw-justify-center tw-gap-y-4">
					<PaginationRow
						showPageNums={false}
						url={url}
						currentPage={searchParams.get("page") ? Number(searchParams.get("page")) : 1}
						paginationData={data?.pagination}
						urlParams={{}}
						setPage={setPage}
					/>
					{data?.data?.map((history: UserBorrowHistory) => {
						return (
							<button key = {history.id} onClick={() => showHistory(history.id)} className = "hover:tw-bg-gray-50">
								<div className = "tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg tw-p-4 tw-flex tw-flex-col tw-gap-y-2" key = {history.id}>
									<span><span className = "tw-font-bold">Transaction #:</span> {history.transactionNum}</span>
									<span><span className = "tw-font-bold">On: </span>{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
								</div>
							</button>
						)
					})}
				</div>
			) : null}
			<Outlet/>
		</>)
	}

	return (
		<div className = "tw-w-full tw-flex tw-flex-col tw-mt-4 tw-gap-y-4">
			<PageHeader>
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">My Books</p>	
				<p className = "tw-text-white">View your checkout history and return books</p>
			</PageHeader>
			<Container>
				<div className = "tw-p-4 tw-flex tw-flex-row tw-gap-x-4">
					{
						screenSize.width >= XL_BREAKPOINT ? rowView() : mobileView()
					}
				
				</div>
			</Container>
		</div>
	)	
}
