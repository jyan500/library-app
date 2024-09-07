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
import { BookBrowse } from "./pages/BookBrowse"
import DefaultLayout from "./layouts/DefaultLayout"
import ProtectedLayout from "./layouts/ProtectedLayout"
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
		],
	},
])

function App() {
	return (
		<div>
			{/*<ScrollToTop/>*/}
		{/*	<Routes>
				<Route element = {<DefaultLayout/>}>
				    <Route path={LOGIN} element={<Login/>} />
				    <Route path={REGISTER} element={<Register/>}/>
				</Route>
				<Route element = {<ProtectedLayout/>}>
					<Route path = {HOME} element={<Home/>}></Route>
					<Route 
						path = {BOOKS} 
						element={<BookDisplay/>}
					>
						<Route 
							path = {BROWSE}
							element={<BookBrowse/>}
						>
						</Route>
						<Route
							path = {SEARCH}
							element={<BookCatalog/>}
						>
						</Route>
						<Route
							path = {BOOK_ID}
							element={<Book/>}
						>
						</Route>
					</Route>
				</Route>
			</Routes>
*/}			
		<RouterProvider router={router}/>
		<ToastList/>
		</div>
	)
}

export default App;
