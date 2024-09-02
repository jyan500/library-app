import React from "react"
import "../styles/dashboard.css"
import { useAppSelector } from "../hooks/redux-hooks"
import MultiCardCarousel from "./carousel/MultiCardCarousel"

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
        	<div className="tw-mx-2 tw-rounded-lg tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-transparent tw-to-black tw-from-60%">
		        <p className = "tw-absolute tw-bottom-4 tw-left-4 tw-text-2xl tw-font-bold tw-text-white">{data.title}</p>
        	</div>
        </>
	)
}

export const Dashboard = () => {
	const { newsPosts } = useAppSelector((state) => state.newsPost)
	const createCarouselElements = (data: Array<CarouselElement>) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <CarouselContent data={element}/>
			})
			return carouselElements
		}
		return []	
	}
	const newsPostElements = createCarouselElements(newsPosts?.length ? newsPosts : [])
	return (
		<div className = "tw-w-full tw-flex tw-flex-col">
			<div className = "tw-my-4 tw-px-36 tw-py-14 tw-bg-primary">
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Stay Connected</p>	
				<p className = "tw-text-white">Get the latest updates by subscribing to our eNewsletter!</p>	
			</div>
			<MultiCardCarousel items={newsPostElements} itemsPerPage={1}/>
		</div>
	)	
}