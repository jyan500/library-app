import React, {useState} from "react"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { GrNext as Next } from "react-icons/gr";
import { v4 as uuidv4 } from "uuid"

type Props = {
	// data: Array<Array<React.ReactNode>>
	data: Array<React.ReactNode>
	numPerPage: number
	total: number
}

export const Carousel = ({data, numPerPage, total}: Props) => {
	const [currentPage, setCurrentPage] = useState(0)

	const onPrev = () => {
		if (currentPage > 0){
			setCurrentPage(currentPage-1)	
		}	
	}

	const onNext = () => {
		if (currentPage < total - 1){
			setCurrentPage(currentPage+1)	
		}
	}

	return (
		<div className = "tw-flex tw-flex-row">
			<div className = "tw-flex tw-justify-center tw-items-center">
				<button onClick = {() => onPrev()} disabled = {currentPage === 0} className = "--transparent">
					<IconContext.Provider value = {{className: "tw-w-10 tw-h-10"}}>
						<Previous/>	
					</IconContext.Provider>	
				</button>
			</div>
		{/*	<div className = "tw-flex tw-flex-1 tw-flex-row tw-justify-center tw-items-center">
				<div className = "tw-h-[455px] tw-overflow-hidden tw-relative tw-rounded-lg">
					<div className="tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-transparent tw-to-black tw-from-60%">
					{
						data[currentPage]?.map((element: React.ReactNode) => {
							return (
								<div className = "" key = {uuidv4()}>
									{element}
								</div>
							)
						})
					}	
					</div>
				</div>
			</div>*/}
			<div className = "">
				<div className = "tw-h-[455px] tw-overflow-hidden tw-relative tw-rounded-lg">
					{
						data?.map((element: React.ReactNode) => {
							return (
								<div key = {uuidv4()} className = "">
									{element}
								</div>
							)
						})	
					}	
					{/*{
						data[currentPage]?.map((element: React.ReactNode) => {
							return (
								<div className = "tw-hidden tw-duration-700 tw-ease-in-out" key = {uuidv4()}>
									{element}
								</div>
							)
						})
					}	*/}
				</div>
			</div>
			<div className = "tw-flex tw-justify-center tw-items-center">
				<button onClick = {() => onNext()} disabled = {currentPage === total - 1} className = "--transparent">
					<IconContext.Provider value = {{className: "tw-w-10 tw-h-10"}}>
						<Next/>
					</IconContext.Provider>	
				</button>
			</div>
		</div>

	)
}