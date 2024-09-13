import React from "react"
import { BOOKS } from "../../helpers/routes"
import { Book } from "../../types/common"
import { Link } from "react-router-dom"

interface Props {
	book: Pick<Book, "id" | "title" | "imageURL" | "author"> | null
	imageClassName?: string
	showLinkImage?: boolean
}

export const BookRowCardImage = ({book, imageClassName, showLinkImage}: Props) => {
	return (
		showLinkImage ? (
			<Link to = {`${BOOKS}/${book?.id}`}>
				<img className = {`${imageClassName ?? "tw-object-cover tw-w-full tw-h-auto xl:tw-w-1/4 xl:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
			</Link>
		) : 
		(
			<img className = {`${imageClassName ?? "tw-object-cover tw-w-full tw-h-auto xl:tw-w-1/4 xl:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
		)
	)	
}