import React, {useEffect} from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom" 
import { useAppSelector } from "../hooks/redux-hooks"
import { Container } from "../components/page-elements/Container"
import { HOME, LOGIN } from "../helpers/routes"
import { usePreloadData } from "../hooks/usePreloadData" 

const CheckoutLayout = () => {
	const location = useLocation()
	const token = useAppSelector((state) => state.auth.token)	
	const { dbCartId } = useAppSelector((state) => state.bookCart)

	if (!token){
		return <Navigate replace to = {LOGIN} state={{alert: "You have been logged out"}}/>
	}
	// if the db cart id is in state, that means we're in checkout
	else if (!dbCartId){
		return (
			<Navigate replace to = {HOME}/>
		)
	}
	return (
		<div>
			<Container>
				<Outlet/>
			</Container>
		</div>
	)
}

export default CheckoutLayout



