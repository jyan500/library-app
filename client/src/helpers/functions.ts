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
 * Takes a flat array and converts it to a nested array with a certain amount of elements per page
 * @param total num of elements within nested array
 * @param total num of elements
 * @param flat array of objects
 */
export const convertFlatToNestedArray = (numPerArray: number, total: number, data: Array<Record<string, any>>) => {
	let res = []
	let cur = []
	for (let i = 0; i < total; ++i){
		cur.push(data[i])
		if ((i+1) % numPerArray === 0){
			res.push(cur)
			cur = []
		}
	}
	if (cur.length > 0){
		res.push(cur)
	}
	return res
}

/**
 * @param user
 * @return string containing the users' first and last name if the user exists, otherwise returns an empty string
 */
export const displayUser = (user: UserProfile | null | undefined) => {
	return user ? (user.firstName + " " + user.lastName) : ""
}




