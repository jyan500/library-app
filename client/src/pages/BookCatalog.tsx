import React, { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar" 
import { useForm, FormProvider } from "react-hook-form"
import { Link, useSearchParams } from "react-router-dom"
import { useLazyGetBooksQuery } from "../services/private/book"
import { Book } from "../types/common"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { BOOKS } from "../helpers/routes"

type FormValues = {
	query: string
	searchBy: string
	page: number
}

export const BookCatalog = () => {
	const [page, setPage] = useState(1)
	// TODO: figure out how to get the URL path without its params
	// TODO: also how to add URL params to a path without refreshing the page
	let [searchParams, setSearchParams] = useSearchParams();
	const defaultForm: FormValues = {
		query: "",
		searchBy: "title" ,
		page: page
	}
	const [preloadedValues, setPreloadedValues] = useState<FormValues>(defaultForm)
	const methods = useForm<FormValues>({defaultValues: preloadedValues})
	const { register, handleSubmit, watch, formState: {errors} } = methods
	const registerOptions = {
		query: { required: "Please enter a search query"},
		searchBy: { required: "Please choose a value to search by"}
	}

	const [trigger, {data, error, isLoading}] = useLazyGetBooksQuery()

	useEffect(() => {

	}, [searchParams])

	const onSubmit = (values: FormValues) => {
	    // Call the query with the current genreId when the form is submitted
	    trigger(values);
	}

	return (
		<div className = "tw-w-full sm:tw-px-36 md:tw-w-full xl:tw-w-3/4 tw-flex tw-flex-col tw-gap-y-4">
			<div>
				<FormProvider {...methods}>
					<form>
						<div className = "lg:tw-flex-row lg:tw-items-center lg:tw-justify-between tw-w-full tw-p-4 tw-border tw-border-gray-300 tw-shadow-md tw-rounded-lg tw-flex tw-flex-col">
							<div className = "tw-flex tw-flex-col lg:tw-flex-row tw-gap-y-4 sm:tw-gap-x-4">
								<div className = "tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-x-2">
									<label className = "tw-w-full tw-font-bold tw-mb-2 sm:tw-mx-2" htmlFor={"search-by"}>Search By</label>
									<select className = "tw-w-full" id = "search-by" {...register("searchBy", registerOptions.searchBy)}>
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
							<div className = "">
								<p>Advanced Search</p>
							</div>
						</div>
						<div className = "tw-mt-2 tw-ml-6 sm:tw-ml-0">
						{Object.keys(registerOptions).map((key) => {
							if (key in errors){
								return (<p className = "tw-text-red-500">{errors[key as keyof typeof errors]?.message}</p>)
							}
						}
						)}
						</div>
					</form>
				</FormProvider>
			</div>
			<div className = "tw-flex tw-flex-col">
				{isLoading ? (<LoadingSpinner/>) : (
					<>
					{
						data?.data?.map((row: Book) => {
							return (
								<div key = {row.id} className = "tw-flex tw-flex-row tw-items-center">
									<div className = "tw-w-1/4">
										<img src = {row.imageURL}/>	
									</div>
									<div className = "tw-w-3/4">
										<p>{row.title}</p>	
									</div>
								</div>
							)	
						})
					}
					</>
				)}
			</div>
			<div className = "tw-flex tw-flex-row tw-gap-x-1">
				{!isLoading && data?.pagination ? (
					Array.from(Array(data?.pagination?.lastPage), (_, i) => {
						return (<Link to={`${BOOKS}?searchBy=${watch("searchBy")}&query=${watch("query")}&page=${i+1}`}>{i+1}</Link>	)
					})
				) : null}
			</div>
		</div>
	)	
}
