export interface UserProfile {
	id: number
	firstName: string
	lastName: string
	email: string
	userRoleId: number
}

export interface UserRole {
	id: number
	name: string
}

export interface Book {
	id: number	
	title: string
	imageURL: string
	author: string
	genreId: number
}

export interface Library {
	id: number
	name: string 
	address: string
	city: string
	state: string
	zipcode: number 
	imageURL: string
}

export interface LibraryBook {
	id: number
	bookId: number
	libraryId: number
	bookStatusId: number
	dateDue: Date | null
}

export interface Genre {
	id: number
	name: string
}

export interface BookStatus {
	id: number
	name: string	
}

export interface NewsPostGenre {
	id: number
	name: string
}

export interface NewsPost {
	id: number
	title: string
	imageURL: string
	description: string,
	newsPostGenreId: number
}

export interface CustomError {
	data: Record<string, any>
	status: number
}

export interface CartItem {
	cartId: string
	libraryBookId: number
	bookStatusId: number
	libraryId: number
	book: Book
}

export interface Toast {
	id: string
	message: string
	type: "success" | "failure" | "warning"
	animationType: string
}

export interface IPagination {
	total?: number;
	lastPage?: number;
	prevPage?: number
	nextPage?: number
	currentPage: number;
	perPage: number;
	from: number;
	to: number;
}

export interface ListResponse<T> {
	pagination: IPagination
	data: Array<T>
}

export type GenericProps = {[key: string]: any}

export type CheckoutCustomError = {
	cartId: string
	canCheckout: boolean
	bookStatusId: number
}

