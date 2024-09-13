import { getNameFromIDModifier, dateModifier } from "../table-modifiers/display-modifiers"
import { useAppSelector, useAppDispatch } from "../../hooks/redux-hooks" 
import { LIBRARIES } from "../../helpers/routes"

export interface LibraryBookConfigType {
	headers: Record<string, any>,
	modifiers: Record<string, any>,
	link: (id: number) => string,
	linkCol: string
}

export const useLibraryBookConfig = () => {
	const { libraries } = useAppSelector((state) => state.library)
	const { bookStatuses } = useAppSelector((state) => state.bookStatus)
	return {
		headers: {
			"libraryId": "Library", 
			"bookStatusId": "Status", 
			"dateDue": "Date Due", 
		},
		linkCol: "libraryId",
		link: (id: number) => `${LIBRARIES}/${id}`,
		modifiers: {
			"bookStatusId": {modifier: getNameFromIDModifier, object: bookStatuses ?? []},
			"libraryId": {modifier: getNameFromIDModifier, object: libraries ?? []},
			"dateDue": {modifier: dateModifier, object: []}
		},
	}
}