import React from "react"
import { Carousel } from "./Carousel"
import "../styles/dashboard.css"
import { useAppSelector } from "../hooks/redux-hooks"
import { convertFlatToNestedArray } from "../helpers/functions"
import { TestCarousel } from "./TestCarousel"

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
		<div key = {data.id}>
		{/*	<img className = "tw-absolute tw-w-full tw-h-full" alt="" src = {data.imageURL}/>
			<p className = "tw-absolute tw-bottom-3 tw-left-3 tw-text-white tw-text-3xl tw-font-bold">{data.title}</p>*/}
			<img src = {data.imageURL}/>
		</div>
	)
}

export const Dashboard = () => {
	const { newsPosts } = useAppSelector((state) => state.newsPost)
	// const createCarouselElements = (data: Array<CarouselElement>, numPerPage: number, total: number) => {
	// 	if (data.length){
	// 		const carouselElements = data.map((element: CarouselElement) => {
	// 			return <CarouselContent data={element}/>
	// 		})
	// 		return convertFlatToNestedArray(numPerPage, total, carouselElements)
	// 	}
	// 	return []	
	// }
	const createCarouselElements = (data: Array<CarouselElement>, numPerPage: number, total: number) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <CarouselContent data={element}/>
			})
			return carouselElements
		}
		return []	
	}
	const newsPerPage = 1 
	const newsPostElements = createCarouselElements(newsPosts?.length ? newsPosts : [], newsPerPage, newsPosts?.length)
	return (
		<div className = "tw-w-full tw-flex tw-flex-col">
			<div className = "tw-my-4 tw-p-16 tw-bg-primary">
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Stay Connected</p>	
				<p className = "tw-text-white">Get the latest updates by subscribing to our eNewsletter!</p>	
			</div>
			{/*<div className = "tw-my-4 tw-flex tw-flex-row tw-justify-center">
				{
					newsPostElements.length ? (<Carousel data = {newsPostElements as Array<React.ReactNode>} numPerPage = {newsPerPage} total = {newsPostElements.length}/>) : null
				}
			</div>*/}
			<div className = "tw-flex tw-flex-row tw-justify-center">
				<TestCarousel/>
			</div>
		</div>
	)	
}