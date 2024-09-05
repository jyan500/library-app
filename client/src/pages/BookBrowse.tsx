import React from "react"
import { MultiCardCarousel } from "../components/carousel/MultiCardCarousel"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { useGetBooksQuery } from "../services/private/book"

export const BookBrowse = () => {
	const { genres } = useAppSelector((state) => state.genre)
	return (
		<div></div>
	)	
}
