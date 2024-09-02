import React from "react"
import { Carousel } from "./Carousel"
import "../styles/dashboard.css"
import { useAppSelector } from "../hooks/redux-hooks"
import { convertFlatToNestedArray } from "../helpers/functions"
import { TestCarousel } from "./TestCarousel"
import MultiCardCarousel from "./MultiCardCarousel"

type CarouselElement = {
	id: number
	title: string
	imageURL: string
}

type CarouselContentProps = {
	data: CarouselElement
	perPage: number
}

export const CarouselContent = ({data, perPage}: CarouselContentProps) => {
	return (
		// <div>
		// {/*	<img className = "tw-absolute tw-w-full tw-h-full" alt="" src = {data.imageURL}/>
		// 	<img src = {data.imageURL}/>
		// </div>
		// <div className = {`tw-relative ${perPage > 1 ? "tw-px-2" : ""}`} style={{width: perPage > 1 ? `${100/perPage}%` : "100%"}}>
		// 	<img src = {data.imageURL}/>
		// 	{/*<p className = "tw-absolute tw-bottom-3 tw-left-3 tw-text-white tw-text-3xl tw-font-bold">{data.title}</p>*/}
		// </div>
		<div className = "tw-w-1/2">
			<img className = "tw-object-cover" src = {data.imageURL}/>
			<p>test</p>
		</div>
		// <img src = {data.imageURL}/>
	)
}

export const Dashboard = () => {
	const { newsPosts } = useAppSelector((state) => state.newsPost)
	const createCarouselElements = (data: Array<CarouselElement>, numPerPage: number, total: number) => {
		if (data.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return <CarouselContent data={element} perPage={numPerPage}/>
			})
			// return convertFlatToNestedArray(numPerPage, total, carouselElements)
			return carouselElements
		}
		return []	
	}
	const newsPerPage = 2
	const newsPostElements = createCarouselElements(newsPosts?.length ? newsPosts : [], newsPerPage, newsPosts?.length)
	return (
		<div className = "tw-w-full tw-flex tw-flex-col">
			<div className = "tw-my-4 tw-px-36 tw-py-14 tw-bg-primary">
				<p className = "tw-my-1 tw-text-4xl tw-font-bold tw-text-white">Stay Connected</p>	
				<p className = "tw-text-white">Get the latest updates by subscribing to our eNewsletter!</p>	
			</div>
			{/*<div className = "tw-my-4 tw-flex tw-flex-row tw-justify-center">
				{
					newsPostElements.length ? (<Carousel data = {newsPostElements as Array<React.ReactNode>} numPerPage = {newsPerPage} total = {newsPostElements.length}/>) : null
				}
			</div>*/}
		{/*	<div className = "tw-flex tw-flex-row tw-justify-center">
				{
					newsPostElements.length ? (<TestCarousel data={newsPostElements as Array<Array<React.ReactNode>>} numPerPage = {newsPerPage} total = {newsPostElements.length}/>) : null
				}
			</div>*/}
			{/*<MultiCardCarousel items={newsPosts.map((post)=>{ return {id: post.id, imageURL: post.imageURL, title: post.title}})}/>*/}
			<MultiCardCarousel itemsPerPage={3}/>
		</div>
	)	
}