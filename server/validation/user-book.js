const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { body, param } = require("express-validator")
const { BULK_INSERT_LIMIT } = require("../constants")

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
			body("books").isArray({min: 1, max: BULK_INSERT_LIMIT})
			.withMessage("Books must be an array")
			.withMessage(`Books cannot have more than ${BULK_INSERT_LIMIT} items`),
			body("books.*.user_book_id").custom(async (value, {req}) => await validateKeyExists("userBook", value, "user_books")),
			body("books.*.book_status_id").custom(async (value, {req}) => await validateKeyExists("bookStatus", value, "book_statuses")),
			body("books.*.library_book_id").custom(async (value, {req}) => await validateKeyExists("libraryBook", value, "library_books"))
		]
	}
	return validationRules

}

module.exports = {
	validateGet: userBookValidator("get"),
	validateReturn: userBookValidator("return"),
}
