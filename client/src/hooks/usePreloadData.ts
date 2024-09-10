import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector} from "./redux-hooks"
import { useGetUserProfileQuery, useGetUserProfilesQuery } from "../services/private/userProfile" 
import { useGetUserRolesQuery } from "../services/private/userRole" 
import { useGetNewsPostsQuery } from "../services/private/newsPost"
import { useGetNewsPostGenresQuery } from "../services/private/newsPostGenre"
import { useGetGenresQuery } from "../services/private/genre" 
import { useGetBookStatusesQuery } from "../services/private/bookStatus" 
import { useGetLibrariesQuery } from "../services/private/library" 
import { setUserProfile, setUserProfiles } from "../slices/userProfileSlice" 
import { setUserRoles, setUserRoleLookup } from "../slices/userRoleSlice" 
import { setBookStatuses } from "../slices/bookStatusSlice" 
import { setGenres } from "../slices/genreSlice" 
import { setNewsPostGenres } from "../slices/newsPostGenreSlice" 
import { setNewsPosts } from "../slices/newsPostSlice"
import { setLibraries } from "../slices/librarySlice"
import { setCartItems } from "../slices/bookCartSlice"

export const usePreloadData = () => {
	const { token } = useAppSelector((state) => state.auth)
	const dispatch = useAppDispatch()
	const {data: userProfileData, isFetching: isUserProfileFetching} = useGetUserProfileQuery()
	const {data: newsPostGenreData, isFetching: isNewsPostGenreFetching } = useGetNewsPostGenresQuery({})
	const {data: genreData, isFetching: isGenreFetching } = useGetGenresQuery({})
	const {data: libraryData, isFetching: isLibraryFetching } = useGetLibrariesQuery({})
	const {data: bookStatusData, isFetching: isBookStatusFetching} = useGetBookStatusesQuery({})

    useEffect(() => {
        // Retrieve user on startup
        if (token){
        	if (userProfileData){
	        	dispatch(setUserProfile({userProfile: userProfileData}))
	        }
	        if (genreData){
	        	dispatch(setGenres(genreData))
	        }
	        if (newsPostGenreData){
	        	dispatch(setNewsPostGenres(newsPostGenreData))
	        }
	        if (libraryData){
	        	dispatch(setLibraries(libraryData))
	        }
	        if (bookStatusData){
	        	dispatch(setBookStatuses(bookStatusData))	
	        }
	        const existingCartItems = JSON.parse(localStorage.getItem("cartItems") ?? "[]")
	        dispatch(setCartItems(existingCartItems))
        }
    }, [userProfileData, genreData, newsPostGenreData, libraryData]);

    return {
    	"userProfile": {userProfileData, isUserProfileFetching},
    	"newsPostGenre": {newsPostGenreData, isNewsPostGenreFetching},
    	"genre": {genreData, isGenreFetching},
    	"library": {libraryData, isLibraryFetching},
    	"bookStatus": {bookStatusData, isBookStatusFetching},
    }
}
