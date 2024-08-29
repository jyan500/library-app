import React, { useEffect } from "react"
import { useParams } from "react-router-dom" 
import { 
	useGetBookQuery 
} from "../services/private/book"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { skipToken } from '@reduxjs/toolkit/query/react'

export const Book = () => {
	const params = useParams<{bookId: string}>()
	const boardId = params.bookId ? parseInt(params.bookId) : undefined 
	const dispatch = useAppDispatch()

	return (
		<div>
			<div>Display book detailed information here including checkout</div>
		</div>
	)
}