const db = require("../db/db")
const { validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const libraryValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "get"){
		validationRules = [
			...validationRules,
			param("libraryId").custom(async (value, {req}) => await validateKeyExists("library", value, "libraries"))
		]
	}
	return validationRules
}

module.exports = {
	validateGet: libraryValidator("get"),
}
