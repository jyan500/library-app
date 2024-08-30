import React from "react"
import { Carousel } from "./Carousel"
import "../styles/dashboard.css"
import { useAppSelector } from "../hooks/redux-hooks"
import { convertFlatToNestedArray } from "../helpers/functions"

type CarouselElement = {
	id: number
	title: string
	imageURL: string
}

export const Dashboard = () => {
	const { newsPosts } = useAppSelector((state) => state.newsPost)
	const createCarouselElements = (data: Array<CarouselElement>, numPerPage: number, total: number) => {
		if (data?.length){
			const carouselElements = data.map((element: CarouselElement) => {
				return (
					<div key = {element.id} className = "tw-flex tw-flex-col">
						<img src = {element.imageURL}/>	
						<p>{element.title}</p>
					</div>
				)
			})
			return convertFlatToNestedArray(numPerPage, total, carouselElements)
		}
		return []	
	}
	const newsPerPage = 1 
	const newsPostElements = createCarouselElements(newsPosts, newsPerPage, newsPosts?.length)
	return (
		<div>
			{
				newsPostElements?.length ? (<Carousel data = {newsPostElements} numPerPage = {newsPerPage} total = {newsPostElements.length}/>) : null
			}
		</div>
	)	
}