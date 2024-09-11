require("dotenv").config()
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
const config = require("../config")
const db = require("../db/db")
const userValidator = require("../validation/user")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const { body, validationResult } = require("express-validator")

router.post("/login", userValidator.loginValidator, handleValidationResult, async (req, res, next) => {
	try {
		const user = await db("users").where("email", req.body.email).first()
		const error = "Failed to login: email or password is incorrect."
		if (!user){
			res.status(400).json({errors: [error]})
			return
		}
		const storedHash = user.password
		const result = await bcrypt.compare(req.body.password, storedHash)
		if (!result){
			res.status(400).json({errors: [error]})
			return
		}
		const userRole = await db("user_roles").where("id", user.user_role_id).first()
		if (!userRole){
			res.status(400).json({errors: [error]})
			return
		}
		const token = jwt.sign({"id": user.id, "email": user.email, "userRole": userRole.name}, process.env.SECRET_KEY, {expiresIn: "1d"})
		res.json({message: "user logged in successfully!", token: token})
	}
	catch (err){
		console.error(`Something went wrong when logging in: ${err}`)
	}
})

router.post("/register", userValidator.registerValidator, handleValidationResult, async (req, res, next) => {
	try {
		const salt = await bcrypt.genSalt(config.saltRounds)
		const hash = await bcrypt.hash(req.body.password, salt)
		const userRole = await db("user_roles").where("name", "USER").first()
		await db("users").insert({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			library_id: req.body.library_id !== "" ? req.body.library_id : null,
			password: hash,
			user_role_id: userRole?.id
		})
		res.json({message: "User registered successfully!"})
	}
	catch (err){
		console.error(`Something went wrong when registering user: ${err}`)
	}
})

module.exports = router
