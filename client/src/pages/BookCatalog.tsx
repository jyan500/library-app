import React, { useState, useEffect } from "react"
import { SearchBar } from "../components/SearchBar" 
import { useForm, FormProvider } from "react-hook-form"
import { useLazyGetBooksQuery } from "../services/private/book"
import { Book } from "../types/common"

type FormValues = {
	query: string
	searchBy: string
}

export const BookCatalog = () => {
	const defaultForm: FormValues = {
		query: "",
		searchBy: "title" 
	}
	const [preloadedValues, setPreloadedValues] = useState<FormValues>(defaultForm)
	const methods = useForm<FormValues>({defaultValues: preloadedValues})
	const { register, handleSubmit, formState: {errors} } = methods
	const registerOptions = {
		query: { required: "Please enter a search query"},
		searchBy: { required: "Please choose a value to search by"}
	}

	const [trigger, {data, error, isLoading}] = useLazyGetBooksQuery()
	console.log(data)

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
			{/*	{bookData?.map((row: Book) => {
					return (
						<div className = "tw-flex tw-flex-row tw-items-center">
							<div className = "tw-w-1/4">
								<img src = {row.imageURL}/>	
							</div>
							<div className = "tw-w-3/4">
								<p>{row.title}</p>	
							</div>
						</div>
					)	
				})}*/}
			</div>
		</div>
	)	
}
