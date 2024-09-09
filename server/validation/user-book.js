const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { body, param } = require("express-validator")

const userBookValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "get"){
		validationRules = [
			...validationRules,
			param("userBookId").custom(async (value, {req}) => await validateKeyExists("userBook", value, "user_books"))
		]
	}
	return validationRules
}

module.exports = {
	validateGet: userBookValidator("get"),
}
