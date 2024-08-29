const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const bookValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "get" || actionType === "update" || actionType === "delete"){
		validationRules = [
			...validationRules,
			param("bookId").custom(async (value, {req}) => await validateKeyExists("book", value, "books"))
		]
	}
	if (actionType !== "delete" && actionType !== "get"){
		validationRules = [
			...validationRules,
			body("title").notEmpty().withMessage("name is required"),
			body("image_url").custom((value, {req}) => isValidURL(value)),
			body("name").notEmpty().withMessage("name is required"),
			body("name").notEmpty().withMessage("name is required"),
		]
	}
	return validationRules
}

module.exports = {
	validateGet: bookValidator("get"),
	validateCreate: bookValidator("create"),
	validateUpdate: bookValidator("update"),
	validateDelete: bookValidator("delete"),
}
