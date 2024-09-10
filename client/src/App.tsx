import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, ScrollRestoration } from "react-router-dom"
import { Login } from "./pages/Login" 
import { Home } from "./pages/Home" 
import { HamburgerButton } from "./components/HamburgerButton" 
import { Register } from "./pages/Register" 
import { Book } from "./pages/Book"
import { BookDisplay } from "./pages/BookDisplay" 
import { BookCatalog } from "./pages/BookCatalog"
import { LibraryDisplay } from "./pages/LibraryDisplay"
import { Library } from "./pages/Library"
import { BookBrowse } from "./pages/BookBrowse"
import { Checkout } from "./pages/Checkout"
import { Confirmation } from "./pages/Confirmation"
import DefaultLayout from "./layouts/DefaultLayout"
import ProtectedLayout from "./layouts/ProtectedLayout"
import CheckoutLayout from "./layouts/CheckoutLayout"
import { useAppSelector, useAppDispatch } from "./hooks/redux-hooks" 
import "./styles/common.css" 
import { ToastList } from "./components/ToastList" 
import {
	HOME,
	LOGIN,
	REGISTER,
	BOOKS,
	BOOK_ID,
	SEARCH,
	BROWSE,
	CHECKOUT,
	LIBRARIES,
	LIBRARY,
	CONFIRMATION,
} from "./helpers/routes"

// Define routes using createBrowserRouter
const router = createBrowserRouter([
	{
		element: 
		<>	
			<ScrollRestoration/>
			<DefaultLayout />
		</>
		,
		children: [
			{
				path: LOGIN,
				element: <Login />,
			},
			{
				path: REGISTER,
				element: <Register />,
			},
		],
	},
	{
		element: <>
			<ScrollRestoration/>
			<ProtectedLayout />
		</>,
		children: [
			{
				path: HOME,
				element: <Home />,
			},
			{
				path: BOOKS,
				element: 
					<BookDisplay />
				,
				children: [
					{
						path: BROWSE,
						element: <BookBrowse />,
					},
					{
						path: SEARCH,
						element: <BookCatalog />,
					},
					{
						path: BOOK_ID,
						element: <Book />,
					},
				],
			},
			{
				path: LIBRARIES,	
				element: <LibraryDisplay/>,
				children: [
					{
						path: LIBRARY,
						element: <Library/>
					}
				]
			},
		],
	},
	{
		element: <>
			<ScrollRestoration/>
			<CheckoutLayout/>
		</>,
		children: [
			{
				path: CHECKOUT,
				element: <Checkout/>,
			},
			{
				path: CONFIRMATION,
				element: <Confirmation/>
			}
		]
	}
])

function App() {
	return (
		<div>
			<RouterProvider router={router}/>
			<ToastList/>
		</div>
	)
}

export default App;
