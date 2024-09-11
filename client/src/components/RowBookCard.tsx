import React from "react"
import { Book } from "../types/common"
import { Link } from "react-router-dom"
import { BOOKS } from "../helpers/routes"
import { RowCard } from "./page-elements/RowCard"

interface Props {
	book: Pick<Book, "id" | "title" | "imageURL" | "author"> | null
	highlightBorder?: string
	showLinkTitle?: boolean
	heightClass?: string 
	imageClassName?: string 
}

export const RowBookCard = ({book, highlightBorder, showLinkTitle, heightClass, imageClassName, children}: React.PropsWithChildren<Props>) => {
	return (
		// <div className = {`${heightClass ?? ""} tw-min-h-0 tw-border ${highlightBorder && highlightBorder !== "" ? "tw-border-red-500" : "tw-border-gray-300"} tw-flex tw-flex-col tw-gap-y-4 tw-p-2 lg:tw-flex-row lg:tw-gap-x-4 tw-rounded-lg tw-shadow-sm`}> 
		// 	<img className = {`${imageClassName ?? "tw-w-full tw-h-auto lg:tw-w-1/4 lg:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
		// 	<div className = "tw-p-4 tw-flex tw-flex-col tw-gap-y-2">
		// 		<div className = "tw-flex tw-flex-col tw-gap-y-2 tw-pb-2">
		// 			{
		// 				showLinkTitle ? (
		// 					<Link to = {`${BOOKS}/${book?.id}`}><span className = "tw-overflow-hidden tw-font-bold tw-text-xl">{book?.title}</span></Link>
		// 				) : (
		// 					<span className = "tw-overflow-hidden tw-font-bold tw-text-xl">{book?.title}</span>
		// 				)
		// 			}
		// 			<span className = "tw-text-lg">{book?.author}</span>
		// 		</div>
		// 		{children}
		// 	</div>
		// </div>
		<RowCard highlightBorder={highlightBorder} heightClass={heightClass}>
			<img className = {`${imageClassName ?? "tw-w-full tw-h-auto lg:tw-w-1/4 lg:tw-h-1/4"}`} src = {book?.imageURL} alt={book?.title}/>
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
		</RowCard>
	)
}