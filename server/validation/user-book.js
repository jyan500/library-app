const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { body, param } = require("express-validator")

const userBookValidator = (actionType) => {
	let validationRules = []
	if (actionType === "get"){
		validationRules = [
			...validationRules,
			param("userBookId").custom(async (value, {req}) => await validateKeyExists("userBook", value, "user_books")),
		]
	}
	else if (actionType === "return"){
		validationRules = [
			...validationRules,
			body("user_book_id").custom(async (value, {req}) => await validateKeyExists("userBook", value, "user_books")),
			body("book_status_id").custom(async (value, {req}) => await validateKeyExists("bookStatus", value, "book_statuses")),
			body("library_book_id").custom(async (value, {req}) => await validateKeyExists("libraryBook", value, "library_books"))
		]
	}
	return validationRules

}

module.exports = {
	validateGet: userBookValidator("get"),
	validateReturn: userBookValidator("return"),
}
