import React from "react"
import { Book } from "../../types/common"
import { Link } from "react-router-dom"
import { BOOKS } from "../../helpers/routes"
import { RowCard } from "../page-elements/RowCard"
import { BookRowCardHeader } from "./BookRowCardHeader"
import { BookRowCardImage } from "./BookRowCardImage"

interface Props {
	book: Pick<Book, "id" | "title" | "imageURL" | "author"> | null
	highlightBorder?: string
	showLinkTitle?: boolean
	showLinkImage?: boolean
	showOnlyChildren?: boolean
	heightClass?: string 
	imageClassName?: string 
}

export const BookDetailRowCard = ({
	book, 
	highlightBorder, 
	showLinkTitle, 
	showLinkImage, 
	heightClass, 
	imageClassName, 
	showOnlyChildren,
	children
}: React.PropsWithChildren<Props>) => {
	return (
		<RowCard highlightBorder={highlightBorder} heightClass={heightClass}>
			<BookRowCardImage book={book} showLinkImage={showLinkImage} imageClassName = {imageClassName}/>
			{!showOnlyChildren ? (
				<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
					<BookRowCardHeader book={book} showLinkTitle={showLinkTitle}/>
					{children}
				</div>
			) : (
				children
			)}
		</RowCard>
	)
}