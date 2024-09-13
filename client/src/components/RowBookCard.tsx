import React from "react"
import { Book } from "../types/common"
import { Link } from "react-router-dom"
import { BOOKS } from "../helpers/routes"
import { RowCard } from "./page-elements/RowCard"

interface Props {
	book: Pick<Book, "id" | "title" | "imageURL" | "author"> | null
	highlightBorder?: string
	showLinkTitle?: boolean
	showLinkImage?: boolean
	showOnlyChildren?: boolean
	heightClass?: string 
	imageClassName?: string 
}

export const RowBookCard = ({
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
			{showLinkImage ? (
				<Link to = {`${BOOKS}/${book?.id}`}>
					<img className = {`${imageClassName ?? "tw-object-cover tw-w-full tw-h-auto xl:tw-w-1/4 xl:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
				</Link>
			) : 
			(
				<img className = {`${imageClassName ?? "tw-object-cover tw-w-full tw-h-auto xl:tw-w-1/4 xl:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
			)}
			{!showOnlyChildren ? (
				<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
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
					{children}
				</div>
			) : (
				children
			)}
		</RowCard>
	)
}