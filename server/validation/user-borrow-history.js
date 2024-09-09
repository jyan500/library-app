const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { body, param } = require("express-validator")

const userBorrowHistoryValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "get"){
		validationRules = [
			...validationRules,
			param("historyId").custom(async (value, {req}) => await validateKeyExists("history", value, "user_borrow_history"))
		]
	}
	return validationRules
}

module.exports = {
	validateGet: userBorrowHistoryValidator("get"),
}
