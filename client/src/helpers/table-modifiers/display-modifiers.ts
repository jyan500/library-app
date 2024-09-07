import { UserProfile } from "../../types/common"
// replace list of user ids with a string of all users' first and last names
export const userProfileModifier = (idList: Array<number>, userList: Array<UserProfile>) => {
	return idList?.map((id) => {
		const user = userList?.find((obj) => id === obj.id)
		return user ? `${user.firstName} ${user.lastName}` : ""
	}).filter((s) => s !== "").join(", ")	
}

export const getNameFromIDModifier = (id: number, objectList: Array<{id: number, name: string}> | null) => {
	return objectList?.find((obj) => obj.id === id)?.name
}

// convert UTC timestamp from backend to date format for display
export const dateModifier = (date: string | null) => {
	return date ? new Date(date).toLocaleDateString() : ""
}