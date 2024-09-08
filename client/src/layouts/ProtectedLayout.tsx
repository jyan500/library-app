import React, {useEffect} from "react"
import { Link, Outlet, Navigate } from "react-router-dom" 
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks" 
import { SideBar } from "../components/SideBar"
import { Modal } from "../components/Modal" 
import { TopNav } from "../components/page-elements/TopNav" 
import { NavBar } from "../components/page-elements/NavBar"
import { Footer } from "../components/page-elements/Footer"
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
import { UserRole } from "../types/common" 
import { LoadingSpinner } from "../components/LoadingSpinner"

const ProtectedLayout = () => {
	const token = useAppSelector((state) => state.auth.token)	
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

	if (!token){
		return <Navigate replace to = {"/login"} state={{alert: "You have been logged out"}}/>
	}
	
	return (
		<div>
			<TopNav isFetching={isUserProfileFetching}/>
			<NavBar/>
			<div className = "tw-my-2 tw-min-h-screen">
				<Outlet/>
			</div>
			<Footer/>
			<Modal/>
		</div>
	)
}

export default ProtectedLayout

