import React from "react"
import "../styles/dashboard.css"
import { useAppSelector } from "../hooks/redux-hooks"
import MultiCardCarousel from "./carousel/MultiCardCarousel"
import { useGetNewsPostsQuery } from "../services/private/newsPost"
import { LoadingSpinner } from "./LoadingSpinner"

type CarouselElement = {
	id: number
	title: string
	imageURL: string
}

type CarouselContentProps = {
	data: CarouselElement
}

export const CarouselContent = ({data}: CarouselContentProps) => {
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

export const Dashboard = () => {
	const { newsPostGenres } = useAppSelector((state) => state.newsPostGenre)

	const exploreGenre = newsPostGenres.find((genre) => genre.name === "Explore")
	const youthGenre = newsPostGenres.find((genre) => genre.name === "Youth & Families")
	const seniorGenre = newsPostGenres.find((genre) => genre.name === "Adult & Seniors")

	const {data: exploreGenreData, isFetching: isExplorePostFetching} = useGetNewsPostsQuery({newsPostGenreId: exploreGenre?.id})
	const {data: youthGenreData, isFetching: isYouthPostFetching} = useGetNewsPostsQuery({newsPostGenreId: youthGenre?.id})
	const {data: seniorGenreData, isFetching: isSeniorPostFetching} = useGetNewsPostsQuery({newsPostGenreId: seniorGenre?.id})

	const createCarouselElements = (data: Array<CarouselElement>) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <CarouselContent data={element}/>
			})
			return carouselElements
		}
		return []	
	}

	return (
		<div className = "tw-w-full tw-flex tw-flex-col tw-mt-4 tw-gap-y-4">
			<div className = "tw-px-36 tw-py-14 tw-bg-primary">
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Stay Connected</p>	
				<p className = "tw-text-white">Get the latest updates by subscribing to our eNewsletter!</p>	
			</div>
			<div className = "tw-flex tw-flex-row tw-justify-center tw-items-center">
				{
					exploreGenreData?.length ? (
						<MultiCardCarousel items={createCarouselElements(exploreGenreData)} itemsPerPage={1}/>
					) : <LoadingSpinner/> 
				}
			</div>
		</div>
	)	
}