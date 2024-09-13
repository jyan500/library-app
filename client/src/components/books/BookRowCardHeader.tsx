import React from "react"
import { BOOKS } from "../../helpers/routes"
import { Book } from "../../types/common"
import { Link } from "react-router-dom"

interface Props {
	book: Pick<Book, "id" | "title" | "imageURL" | "author"> | null
	showLinkTitle?: boolean
}

export const BookRowCardHeader = ({book, showLinkTitle}: Props) => {
	return (
		<div className = "tw-flex tw-flex-col tw-gap-y-2 tw-pb-2">
			{
				showLinkTitle ? (
					<Link to = {`${BOOKS}/${book?.id}`}><span className = "tw-overflow-hidden tw-font-bold tw-text-xl">{book?.title}</span></Link>
				) : (
					<span className = "tw-overflow-hidden tw-font-bold tw-text-xl">{book?.title}</span>
				)
			}
			<span className = "tw-text-lg">{book?.author}</span>
		</div>
	)	
}