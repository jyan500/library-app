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

export interface Genre {
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
	data: Record<string, Array<string>>
	status: number
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
	currentPage: number;
	perPage: number;
	from: number;
	to: number;
}

export interface ListResponse<T> {
	pagination: IPagination
	data: Array<T>
}

