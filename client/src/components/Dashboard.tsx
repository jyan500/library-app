import React from "react"
import "../styles/dashboard.css"
import { BookConfirmation } from "../types/common"
import { useAppSelector } from "../hooks/redux-hooks"
import { MultiCardCarousel } from "./carousel/MultiCardCarousel"
import { PageHeader } from "./page-elements/PageHeader" 
import { useGetNewsPostsQuery } from "../services/private/newsPost"
import { LoadingSpinner } from "./LoadingSpinner"
import { GridCard } from "../components/GridCard"
import { useScreenSize } from "../hooks/useScreenSize"
import { XL_BREAKPOINT } from "../helpers/constants"
import { Container } from "./page-elements/Container"
import { RowBookCard } from "./RowBookCard"
import { useGetRecentUserBorrowHistoryQuery } from "../services/private/userBorrowHistory"

interface CarouselElement {
	id: number
	title: string
	imageURL: string
	description?: string
}

type BookCarouselElement = CarouselElement & { 
	author: string 
	libraryName: string
	dateDue: Date
}

interface CarouselContentProps<T = {}> {
	data: T
}

const ImageCarouselContent = ({data}: CarouselContentProps<CarouselElement>) => {
	return (
		<>
	        <img src={data.imageURL} alt={data.title} className="tw-relative tw-object-cover tw-w-full tw-h-full tw-rounded-lg" />
	        {/* Adds linear gradient starting from mid to bottom of the image to provide more contrast with the white text*/}
        	<div className="tw-mx-2 tw-rounded-lg tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-transparent tw-to-black tw-from-60%">
		        <p className = "tw-absolute tw-bottom-4 tw-left-4 tw-text-2xl tw-font-bold tw-text-white">{data.title}</p>
        	</div>
        </>
	)
}

const CardCarouselContent = ({data}: CarouselContentProps<CarouselElement>) => {
	return (
		<div className = "tw-h-full tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg">
			<img src = {data.imageURL} alt={data.title} className = "tw-object-cover tw-h-[600px] xl:tw-h-64 tw-w-full tw-h-full tw-rounded-lg"/>
			<div className = "tw-p-4 tw-space-y-2">
				<p className = "tw-text-2xl tw-font-bold">
					{data.title}	
				</p>
				<p>
					{data.description}
				</p>
			</div>
		</div>
	)
}

const BookCarouselContent = ({data}: CarouselContentProps<BookCarouselElement>) => {
	const dueDate = new Date(data.dateDue)
	return (
		<RowBookCard imageClassName = {"tw-w-full tw-h-auto lg:tw-w-1/3 lg:tw-h-1/3"} book={data} showLinkTitle={true}>
			<span><span className = "tw-font-bold">Date Due</span>: {dueDate.toLocaleDateString("en-US")}</span>
			<span>{data.libraryName} Library</span>
		</RowBookCard>
	)	
}

export const Dashboard = () => {
	const { newsPostGenres } = useAppSelector((state) => state.newsPostGenre)
	const { libraries } = useAppSelector((state) => state.library)
	const screenSize = useScreenSize()

	const exploreGenre = newsPostGenres.find((genre) => genre.name === "Explore")
	const youthGenre = newsPostGenres.find((genre) => genre.name === "Youth & Families")
	const seniorGenre = newsPostGenres.find((genre) => genre.name === "Adult & Seniors")

	const {data: exploreGenreData, isFetching: isExplorePostFetching} = useGetNewsPostsQuery({newsPostGenreId: exploreGenre?.id})
	const {data: youthGenreData, isFetching: isYouthPostFetching} = useGetNewsPostsQuery({newsPostGenreId: youthGenre?.id})
	const {data: seniorGenreData, isFetching: isSeniorPostFetching} = useGetNewsPostsQuery({newsPostGenreId: seniorGenre?.id})
	const {data: userBorrowHistory, isFetching: isUserBorrowHistory} = useGetRecentUserBorrowHistoryQuery({books: true})

	const createImageCarouselElements = (data: Array<CarouselElement>) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <ImageCarouselContent data={element}/>
			})
			return carouselElements
		}
		return []	
	}

	const createCardCarouselElements = (data: Array<CarouselElement>) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <CardCarouselContent data={element}/>
			})
			return carouselElements
		}
		return []
	}

	const createBookCarouselElements = (data: Array<BookCarouselElement>) => {
		if (data.length){
			const carouselElements = data.map((element: BookCarouselElement) => {
				return <BookCarouselContent data={element}/>
			})
			return carouselElements
		}	
		return []
	}

	return (
		<div className = "tw-w-full tw-flex tw-flex-col tw-mt-4 tw-gap-y-4">
			{
				userBorrowHistory?.[0].books?.length ? (
					<>
						<PageHeader>
							<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">My Books</p>	
							<p className = "tw-text-white">Check out your recent findings!</p>	
						</PageHeader>
						<Container>
							{
								userBorrowHistory[0].books.length > 1 ? (
									<MultiCardCarousel items={createBookCarouselElements(userBorrowHistory[0].books.map((book: BookConfirmation) => {
										return {
											id: book.id,
											imageURL: book.imageURL,
											title: book.title,
											author: book.author,
											dateDue: book.dateDue,
											libraryName: libraries?.find((library) => library.id === book.libraryId)?.name ?? ""
										}
									}))} itemsPerPage={1}/>
								) : 
								(
									<RowBookCard showLinkTitle = {true} book = {userBorrowHistory[0].books[0]}>
									</RowBookCard>
								)
							}
						</Container>
					</>
				) : null
			}
			<PageHeader>
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Stay Connected</p>	
				<p className = "tw-text-white">Get the latest updates by subscribing to our eNewsletter!</p>	
			</PageHeader>
			<div className = "tw-flex tw-flex-row tw-justify-center tw-items-center">
				{
					exploreGenreData?.length ? (
						<MultiCardCarousel items={createImageCarouselElements(exploreGenreData)} itemsPerPage={1}/>
					) : <LoadingSpinner/> 
				}
			</div>

			<Container>
				<>
					{
						youthGenreData?.length ? (
						<div className = "tw-pt-4 tw-border-t-2 tw-border-gray-300 tw-flex xl:tw-flex-row tw-flex-col tw-justify-center">
							<div className = "xl:tw-w-1/3">
								<p className = "tw-font-bold tw-text-3xl">{youthGenre?.name}</p>	
								<p>
								Explore resources, activities, author events and more for kids, teens, and families from the comfort of your home.
								</p>
							</div>
							<div className = "tw-pt-2 xl:tw-w-2/3">
								<MultiCardCarousel 
									items={createCardCarouselElements(youthGenreData)} 
									itemsPerPage={screenSize.width <= XL_BREAKPOINT ? 1 : 3} 
									itemContainerClassName={"sm:tw-h-[600px]"}
								/>
							</div>
						</div>
					) : null
					}
					{
						seniorGenreData?.length ? (
						<div className = "tw-pt-4 tw-border-t-2 tw-border-gray-300 tw-flex xl:tw-flex-row tw-flex-col tw-justify-center">
							<div className = "xl:tw-w-1/3">
								<p className = "tw-font-bold tw-text-3xl">{seniorGenre?.name}</p>	
								<p>
								Discover new ways to stay connected with your favorite authors and musicians, or learn a new language or fun hobby.
								</p>
							</div>
							<div className = "tw-pt-2 xl:tw-w-2/3">
								<MultiCardCarousel 
									items={createCardCarouselElements(seniorGenreData)} 
									itemsPerPage={screenSize.width <= XL_BREAKPOINT ? 1 : 3} 
									itemContainerClassName={"sm:tw-h-[600px]"}/>
							</div>
						</div>
					) : null
					}
				</>
			</Container>

		</div>
	)	
}