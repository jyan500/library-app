import React, { useEffect } from "react"
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { RowBookCard } from "../components/RowBookCard"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { HOME } from "../helpers/routes"
import { v4 as uuidv4 } from "uuid"
import { IconButton } from "../components/page-elements/IconButton"
import { UserBorrowHistory, BookConfirmation } from "../types/common"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetUserBorrowHistoriesQuery } from "../services/private/userBorrowHistory"

export const UserBorrowHistoryList = () => {
	const dispatch = useAppDispatch()
	const {data, isFetching } = useGetUserBorrowHistoriesQuery({})

	return (
		<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
			<div className = "tw-flex tw-flex-col tw-gap-y-4">
				{data?.data?.map((history: UserBorrowHistory, i: number) => {
					return (
						<div className = "tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg tw-p-4 tw-flex tw-flex-col tw-gap-y-2" key = {history.id}>
							<span><span className = "tw-font-bold">Transaction #:</span> {history.transactionNum}</span>
							<span><span className = "tw-font-bold">On: </span>{new Date(history.createdAt).toLocaleDateString("en-US")}</span>
						</div>
					)
				})}
			</div>
		</div>
	)	
}