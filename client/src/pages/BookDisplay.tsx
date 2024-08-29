import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { Link, Outlet, useParams } from "react-router-dom" 
import { toggleShowModal, setModalType } from "../slices/modalSlice" 
import { setBooks }  from "../slices/bookSlice"
import { Table } from "../components/Table" 
import { useGetBooksQuery } from "../services/private/book"
import { useBookConfig, BookConfigType } from "../helpers/table-config/useBookConfig" 
import { MdOutlineArrowBackIosNew as ArrowBackward } from "react-icons/md"
import { Modal } from "../components/Modal" 

export const BookDisplay = () => {
	const { bookId } = useParams();
	const { userRoleLookup } = useAppSelector((state) => state.userRole)
	const { userProfile } = useAppSelector((state) => state.userProfile)
	const { data: bookData } = useGetBooksQuery({})
	const config: BookConfigType = useBookConfig()
	const dispatch = useAppDispatch()

	return (
		<div>
			{
				bookId != null ? (
					<Link className = "link-container" to = {`/boards`}>
						<ArrowBackward className = "icon"/>
						<span>Return to Books</span>
					</Link>
				) : (
					<Table data={bookData} config={config}/>
				)
			}
			<Outlet/>
		</div>
	)
}