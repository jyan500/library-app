const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const newsPostValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "get" || actionType === "update" || actionType === "delete"){
		validationRules = [
			...validationRules,
			param("newsId").custom(async (value, {req}) => await validateKeyExists("newsPost", value, "news_posts"))
		]
	}
	if (actionType !== "delete" && actionType !== "get"){
		validationRules = [
			...validationRules,
			body("title").notEmpty().withMessage("title is required"),
			body("image_url").custom((value, {req}) => isValidURL(value)),
		]
	}
	return validationRules
}

module.exports = {
	validateGet: newsPostValidator("get"),
	validateCreate: newsPostValidator("create"),
	validateUpdate: newsPostValidator("update"),
	validateDelete: newsPostValidator("delete"),
}
