import React, { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar" 
import { GridCard } from "../components/GridCard" 
import { useForm, FormProvider } from "react-hook-form"
import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom"
import { useLazyGetBooksQuery } from "../services/private/book"
import { useAppSelector } from "../hooks/redux-hooks"
import { Book, CartItem } from "../types/common"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { BOOKS } from "../helpers/routes"
import { IconContext } from "react-icons" 
import { v4 as uuidv4 } from "uuid"
import { FaBookmark as Bookmark } from "react-icons/fa";
import { GrNext as Next, GrPrevious as Previous } from "react-icons/gr";
import { IconButton } from "../components/page-elements/IconButton"
import { PaginationRow } from "../components/page-elements/PaginationRow"

interface FormValues {
	query: string
	searchBy: string
	page: number
}

export const BookCatalog = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	let navigate = useNavigate()
	const defaultForm: FormValues = {
		query: "",
		searchBy: "title" ,
		page: 1 
	}
	const { cartItems } = useAppSelector((state) => state.bookCart) 
	const [preloadedValues, setPreloadedValues] = useState<FormValues>(defaultForm)
	const methods = useForm<FormValues>({defaultValues: preloadedValues})
	const { register, handleSubmit, reset, watch, setValue, formState: {errors} } = methods
	const registerOptions = {
		query: { required: "Please enter a search query"},
		searchBy: { required: "Please choose a value to search by"}
	}

	useEffect(() => {
		if (searchParams){
			const query = searchParams.get("query")
			const searchBy = searchParams.get("searchBy")
			const page = searchParams.get("page")
			if (query && searchBy && page){
				const form = {
					query: decodeURIComponent(query), searchBy: searchBy, page: parseInt(page)
				}
				reset(form)	
				trigger(form)
			}
		}
	}, [searchParams])

	const [trigger, {data, error, isFetching, isLoading}] = useLazyGetBooksQuery()

	const setPage = async (pageNum: number) => {
	    navigate(`${BOOKS}?query=${encodeURIComponent(watch("query"))}&searchBy=${watch("searchBy")}&page=${pageNum}`, { replace: true });
	}

	const onSubmit = (values: FormValues) => {
	    // Call the query with the current genreId when the form is submitted
	    // Update the URL with query parameters without reloading the page

	    trigger({...values, page: 1})
	    navigate(`${BOOKS}?query=${encodeURIComponent(values.query)}&searchBy=${values.searchBy}&page=${1}`, { replace: true });
	}

	const onClickDetails = (id: number) => {
	    navigate(`${BOOKS}/${id}`);
	}

	return (
		<>
			<div className = "tw-w-full">
				<FormProvider {...methods}>
					<form>
						<div className = "tw-gap-y-4 xl:tw-flex-row xl:tw-items-center xl:tw-justify-between tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg tw-flex tw-flex-col">
							<div className = "tw-flex tw-flex-col xl:tw-flex-row tw-gap-y-4 sm:tw-gap-x-4">
								<div className = "xl:tw-w-64 tw-flex tw-w-full tw-flex-col xl:tw-flex-row xl:tw-items-center tw-gap-x-2">
									<label className = "xl:tw-w-1/3 tw-w-full tw-font-bold tw-mb-2" htmlFor={"search-by"}>Search By</label>
									<select className = "xl:tw-w-2/3 tw-w-full" id = "search-by" {...register("searchBy", registerOptions.searchBy)}>
										<option key = {"title"} value = "title">Title</option>
										<option key = {"author"} value = "author">Author</option>
										<option key = {"genre"} value = "genre">Genre</option>
									</select>
								</div>
								<SearchBar 
									registerOptions = {registerOptions.query} 
									registerField = {"query"} 
									placeholder = "Search..." 
								/>
								<button onClick={handleSubmit(onSubmit)} className = "button tw-bg-primary">Search</button>
							</div>
							<div className = "tw-flex tw-items-center lg:tw-gap-x-4">
								<PaginationRow
									showPageNums={false}
									paginationData={data?.pagination}
									setPage={setPage}
								/>
							</div>
						</div>
						<div className = "tw-mt-2 tw-ml-6 sm:tw-ml-0">
						{Object.keys(registerOptions).map((key) => {
							if (key in errors){
								return (<p key = {key} className = "tw-text-red-500">{errors[key as keyof typeof errors]?.message}</p>)
							}
						}
						)}
						</div>
					</form>
				</FormProvider>
			</div>
			{isFetching ? (<LoadingSpinner/>) : (
				<div className = "tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-5 tw-gap-4">
					{
						data?.data?.map((row: Book) => {
							const inCart = cartItems?.find((item: CartItem) => item.book.id === row.id)
							return (
								<GridCard key={row.id}>
									<>
										<Link to = {`${BOOKS}/${row.id}`}><img className = "tw-h-auto lg:tw-h-[360px] tw-object-cover" src = {row.imageURL} alt={row.title}/></Link>
										<div className="tw-flex tw-flex-col tw-gap-y-2">
											<span className = "tw-font-bold">{row.title}</span>
											<span>{row.author ? `By: ${row.author}` : ""}</span>
										</div>
										<div className="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mt-auto tw-pt-3 tw-gap-x-2">
											<button onClick={() => onClickDetails(row.id)} className = "button">Details</button>
											{
												inCart ? (
													<IconContext.Provider value={{color: "var(--bs-primary)", className: "tw-w-6 tw-h-6"}}>
														<Bookmark/>
													</IconContext.Provider>
												) : null 
											}
										</div>
									</>
								</GridCard>
							)
						})
					}
				</div>
			)}
			{!isFetching && data?.pagination ? (
				<div className = "tw-mx-4 md:tw-mx-0 tw-flex tw-py-4">
					<PaginationRow
						showPageNums={true}
						paginationData={data?.pagination}
						currentPage={watch("page")}
						setPage={setPage}
						urlParams={{
							query: encodeURIComponent(watch("query")),
							searchBy: watch("searchBy"),
						}}
						url={`${BOOKS}`}	
					/>
				</div>
			) : null}
		</>
	)	
}
