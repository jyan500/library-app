import React, { useEffect } from "react"
import { useLocation, useNavigate, Navigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks/redux-hooks"
import { RowBookCard } from "../components/RowBookCard"
import { IconContext } from "react-icons"
import { GrPrevious as Previous } from "react-icons/gr";
import { HOME } from "../helpers/routes"
import { v4 as uuidv4 } from "uuid"
import { IconButton } from "../components/page-elements/IconButton"

export const Confirmation = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	return (
		<div className = "tw-flex tw-flex-col tw-gap-y-2">
			<div>
				<IconButton onClick={() => console.log("test")}>
	            	<div className = "tw-flex tw-flex-row tw-gap-x-4 tw-items-center">
	                    <IconContext.Provider value = {{className: "tw-w-6 tw-h-6"}}>
	                        <Previous/> 
	                    </IconContext.Provider> 
	                    <span className = "tw-font-bold tw-text-lg">Return to Home</span>
	                </div>
                </IconButton>
			</div>
		{/*	{cartItems?.map((item: CartItem) => {
				return (
					<RowBookCard 
						key={item.cartItemId}
						book={item.book}
					>
						<>
							<div className = "tw-border-t tw-border-gray-300"></div>
							<div>
								<span>{libraries.find((library) => library.id === item.libraryId)?.name} Library</span>
							</div>
							<div>
								<span className = "tw-font-bold">Due Date: {dueDate.toLocaleDateString()}</span>
							</div>
						</>
					</RowBookCard>
				)	
			})}
			<button onClick={onCheckout} className = "button">Checkout</button>*/}
		</div>
	)	
}