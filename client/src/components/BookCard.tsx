import React from "react"
import { Book } from "../types/common"

type Props = {
	book: Book
}

export const BookCard = ({book}: Props) => {
	return (
		// <div className = "tw-p-4 tw-flex tw-flex-col tw-gap-2 tw-border tw-border-gray-300 tw-shadow-lg tw-rounded-lg">
		// 	<div className = "tw-flex tw-justify-center">
		// 		<img className = "tw-h-72" src = {book.imageURL}/>	
		// 	</div>
		// 	<div className = "tw-flex tw-h-full tw-flex-col tw-justify-center tw-content-between">
		// 		<div>
		// 			<p>{book.title}</p>	
		// 			<p>{book.author ? `By: ${book.author}` : ""}</p>	
		// 		</div>
		// 		<button className = "button">Check Out</button>
		// 	</div>
		// </div>
		<div className="tw-col-span-1 tw-mx-4 md:tw-mx-0 tw-flex tw-flex-col tw-bg-white tw-border-2 tw-p-4 tw-gap-y-2">
			<img className = "tw-h-auto lg:tw-h-[360px] tw-object-cover" src = {book.imageURL}/>	
			<div className="tw-flex tw-flex-wrap tw-gap-y-2">
				<span className = "tw-font-bold">{book.title}</span>
				<span>{book.author ? `By: ${book.author}` : ""}</span>
			</div>
			<div className="tw-flex tw-flex-wrap tw-mt-auto tw-pt-3">
				<button className = "button">Check Out</button>
			</div>
		</div>
	)
}