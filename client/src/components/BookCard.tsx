import React from "react"
import { Book } from "../types/common"

type Props = {
	book: Book
}

export const BookCard = ({book}: Props) => {
	return (
		<div className = "tw-p-4 tw-border tw-border-gray-300 tw-shadow-lg tw-rounded-lg">
			<div className = "tw-flex tw-max-h-96 tw-justify-center">
				<img className = "" src = {book.imageURL}/>	
			</div>
			<div>
				<p>{book.title}</p>	
				<p>{book.author ? `By: ${book.author}` : ""}</p>	
				<p>Check Availability</p>
				<button className = "button">Check Out</button>
			</div>
		</div>
	)
}