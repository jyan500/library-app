export interface UserProfile {
	id: number
	firstName: string
	lastName: string
	email: string
	libraryId: number
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
	email: string
	phoneNum: string
	hours?: Array<LibraryHour>
	libraryHourStatus?: LibraryHourStatus	
}

export interface LibraryHour {
	id: number
	day: number
	startHour: string 
	endHour: string
}

export interface LibraryHourStatus {
	isOpen: boolean
	nextOpening?: LibraryHour 
	nextClosing?: LibraryHour
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
	id: string
	libraryBookId: number
	bookStatusId: number
	libraryId: number
	book: Book
}

export type BookConfirmation = Book & { 
	libraryId: number 
	libraryBookId: number
	userBookId: number
	dateDue: Date
	dateReturned: Date | null
}

export interface UserBorrowHistory {
	id: number
	transactionNum: string
	userId: number
	createdAt: Date
	books: Array<BookConfirmation>
}

export interface UserBook {
	id: number
	libraryBookId: number
	userId: number
	userBorrowHistoryId: number
	dateBorrowed: Date
	dateDue: Date
	dateReturned: Date | null
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

export interface CheckoutCustomError {
	id: string
	canCheckout: boolean
	bookStatusId: number
}

export type MultiSelectRowType = Book

