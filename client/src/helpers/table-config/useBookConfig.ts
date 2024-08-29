import { userProfileModifier, dateModifier } from "../table-modifiers/display-modifiers"
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks" 
import { setModalType, toggleShowModal } from "../../slices/modalSlice" 

export type BookConfigType = {
	headers: Record<string, any>,
	linkCol: string
	link: (id: string) => string 
	modifiers: Record<string, any>
}

export const useBookConfig = () => {
	const { userProfiles, userProfile } = useAppSelector((state) => state.userProfile)
	const { userRoleLookup } = useAppSelector((state) => state.userRole)
	const dispatch = useAppDispatch()
	const isAdminOrBoardAdmin = userProfile && (userRoleLookup[userProfile.userRoleId] === "ADMIN" || userRoleLookup[userProfile.userRoleId] === "BOARD_ADMIN")
	return {
		headers: {
			"title": "Title", 
			"image": "Image", 
			"genreId": "Genre", 
			"author": "Author", 
		},
		modifiers: {},
		linkCol: "title",
		link: (id: string) => `/books/${id}`,
	}
}