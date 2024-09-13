const { param, body } = require("express-validator")
const { validateKeyExists, checkEntityExistsIn } = require("./helper")
const db = require("../db/db")


const userProfileValidator = (type) => {
	return [
		...(type === "user-profile" ? 
			[param("userId").notEmpty().custom(async(value, {req})=> await validateKeyExists("user", value, "users"))]
		: []),
		body("library_id").optional().notEmpty().custom(async (value, {req}) => await validateKeyExists("library", value, "libraries")),
		body("first_name").notEmpty().withMessage("First Name is required"),
		body("last_name").notEmpty().withMessage("Last Name is required"),
		body("email").notEmpty().withMessage("Email is required")
		.isEmail().withMessage("Invalid email")
		.normalizeEmail(),
		...(type === "register" ? [
			body("email").custom((value, {req}) => {
				return new Promise((resolve, reject) => {
					db("users").where("email", req.body.email).then((res) => {
						if (res?.length > 0){
							reject(new Error("Email already in use"))
						}
						resolve(true)
					})	
				})
			})
		] : []),
	]
}

const registerValidator = [
	...userProfileValidator("register"),
	body("password").notEmpty().withMessage("Password is required")
		.isStrongPassword({minLength: 6, minLowerCase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage(
			"Password must be at least 6 characters long, " + 
			"including one lowercase, one uppercase, " + 
			"one number and one symbol."
		),
	body("confirm_password").notEmpty().withMessage("Confirm Password is required").custom((value, {req}) => {
		if (value !== req.body.password)	{
			throw new Error("Passwords don't match")
		}
		else {
			return value
		}
	}),
]

const loginValidator = [
	body("email")
		.isEmail().withMessage("Invalid email")
		.normalizeEmail().custom((value, {req}) => {
		return new Promise((resolve, reject) => {
			db("users").where("email", req.body.email).then((res) => {
				if (res?.length === 0){
					reject(new Error(`User with email ${req.body.email} could not be found`))
				}
				resolve(true)
			})	
		})
	}),
	body("password")
		.isLength({min: 6}).withMessage("Invalid Password"),
]

module.exports = {
	userProfileValidator: userProfileValidator("user-profile"),
	registerValidator,
	loginValidator
}