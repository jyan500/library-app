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

export interface NewsPost {
	id: number
	title: string
	imageURL: string
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

