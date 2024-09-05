import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
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

function App() {
	return (
		<div>
			<Routes>
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
			<ToastList/>
		</div>
	)
}

export default App;
