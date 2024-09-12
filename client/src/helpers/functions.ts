import type { UserProfile, LibraryHourStatus } from "../types/common"
import { DAYS } from "./constants"
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

/**
 * @param HH:MM:SS formatted string in military time 
 * @return locale string in HH:MM AM/PM
 */
export const convertMilitaryToStandardTime = (timeString: string) => {
	// Split the time string (expected format "HH:MM:SS") into hours, minutes
	let [hours, minutes, _] = timeString.split(':');

	// Convert hours to an integer
	const numHours = parseInt(hours, 10);

	// Determine AM or PM
	const period = numHours >= 12 ? 'PM' : 'AM';

	// Convert to 12-hour format
	// handling edge case when 0:00 should be represented as 12:00 AM
	const convertedHours = numHours % 12 === 0 ? 12 : numHours % 12; 

	// Ensure minutes are two digits (in case MySQL returns them without leading zeros)
	minutes = minutes.padStart(2, '0')

	return `${convertedHours}:${minutes} ${period}`

}

/**
 * @param LibraryHourStatus object (see types)
 * @return string that displays the next opening time if the library is closed, or the next closing time if the library is open
 */
export const showLibraryHourStatus = (libraryHourStatus: LibraryHourStatus) => {
	if (libraryHourStatus.isOpen && libraryHourStatus.nextClosing){
		const nextClosing = convertMilitaryToStandardTime(libraryHourStatus.nextClosing?.endHour)
		return `Open until ${nextClosing}`
	}
	else if (!libraryHourStatus.isOpen && libraryHourStatus.nextOpening){

		const nextOpening = convertMilitaryToStandardTime(libraryHourStatus.nextOpening?.startHour)
		const day = DAYS[libraryHourStatus.nextOpening.day as keyof typeof DAYS]
		return `Closed until ${day}, ${nextOpening}`
	}
	return ""
}






