const express = require("express")
const router = express.Router()
const db = require("../db/db")
const { userProfileValidator } = require("../validation/user")
const { handleValidationResult }  = require("../middleware/validation-middleware")

// see the logged in user's profile
router.get("/me", async (req, res, next) => {
	try {
		// pulled from token middleware 
		const {id: userId, userRole} = req.user
		const userProfile = await db("users")
			.where("id", userId)
			.select(
				"users.id as id", 
				"users.first_name as firstName", 
				"users.last_name as lastName", 
				"users.email as email", 
				"users.library_id as libraryId",
				).first()
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
				"users.library_id as libraryId",
				)
		res.json(userProfiles)
	}
	catch (err){
		console.log(`Error while getting user profile: ${err.message}`)	
		next(err)
	}
})

router.put("/:userId", userProfileValidator, handleValidationResult, async (req, res, next) => {
	try {
		await db("users").where("id", req.params.userId).update({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			library_id: req.body.library_id,
		})
		res.json({message: "User Profile updated successfully!"})
	}
	catch (err) {
		console.log(`Error while updating user profile: ${err.message}`)
		next(err)
	}
})

module.exports = router