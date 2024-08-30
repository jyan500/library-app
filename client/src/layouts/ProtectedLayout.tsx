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
import { setUserProfile, setUserProfiles } from "../slices/userProfileSlice" 
import { setUserRoles, setUserRoleLookup } from "../slices/userRoleSlice" 
import { setNewsPosts } from "../slices/newsPostSlice"
import { UserRole } from "../types/common" 

const ProtectedLayout = () => {
	const token = useAppSelector((state) => state.auth.token)	
	const dispatch = useAppDispatch()
	const {data: userProfileData, isFetching: isUserProfileFetching} = useGetUserProfileQuery()
	const {data: newsPostData, isFetching: isNewsPostFetching} = useGetNewsPostsQuery({})

    useEffect(() => {
        // Retrieve user on startup
        if (token){
        	if (userProfileData){
	        	dispatch(setUserProfile({userProfile: userProfileData}))
	        }
	        if (newsPostData){
	        	dispatch(setNewsPosts(newsPostData))
	        }
        }
    }, [userProfileData, newsPostData]);

	if (!token){
		return <Navigate replace to = {"/login"} state={{alert: "You have been logged out"}}/>
	}
	
	return (
		<div>
			<TopNav isFetching={isUserProfileFetching}/>
			<NavBar/>
			<div className = "tw-my-2 tw-h-[100vh]">
				<Outlet/>
			</div>
			<Footer/>
			<Modal/>
		</div>
	)
}

export default ProtectedLayout

