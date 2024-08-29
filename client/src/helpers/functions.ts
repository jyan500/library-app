import type { UserProfile } from "../types/common"
/**
 * @param backend error response as an object
 * @return Array of strings containing the parsed error messages
 */
export const parseErrorResponse = (err: Record<string, any>): Array<string> => {
	return Object.values(err).map((e) => e[0])
}

/**
 * @param parse url parameters
 * @return url string with params included
 */
export const parseURLParams = (params: Record<string, any>) => {
	const keys = Object.keys(params)
	return keys.reduce((acc, key, i) => {
		if (i < keys.length - 1){
			return acc + `${key}=${params[key]}&`
		}
		return acc + `${key}=${params[key]}`
	}, "")
}

/**
 * @param user
 * @return string containing the users' first and last name if the user exists, otherwise returns an empty string
 */
export const displayUser = (user: UserProfile | null | undefined) => {
	return user ? (user.firstName + " " + user.lastName) : ""
}




