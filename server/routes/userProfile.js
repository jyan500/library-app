const express = require("express")
const router = express.Router()
const db = require("../db/db")

// see the logged in user's profile
router.get("/me", async (req, res, next) => {
	try {
		// pulled from token middleware 
		const {id: userId, userRole} = req.user
		const userProfile = await db("users")
			.select(
				"users.id as id", 
				"users.first_name as firstName", 
				"users.last_name as lastName", 
				"users.email as email", 
				"users.user_role_id as userRoleId").first()
		res.json(userProfile)
	}
	catch (err){
		console.log(`Error while getting user profile: ${err.message}`)	
		next(err)
	}
})

router.get("/", async (req, res, next) => {
	try {
		// pulled from token middleware 
		const {id: userId, userRole} = req.user
		const userProfiles = await db("users")
			.select(
				"users.id as id", 
				"users.first_name as firstName", 
				"users.last_name as lastName", 
				"users.email as email", 
				"users.user_role_id as userRoleId")
		res.json(userProfiles)
	}
	catch (err){
		console.log(`Error while getting user profile: ${err.message}`)	
		next(err)
	}
})

module.exports = router