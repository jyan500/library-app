const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const checkoutValidator = () => {
	const validationRules = [
		// cartItems must be an array
		body("cartItems").isArray({min: 1, max: BULK_INSERT_LIMIT})
		.withMessage("Cart Items must be an array")
		.withMessage(`Cart Items cannot have more than ${BULK_INSERT_LIMIT} items`),
		// for each cartItem, check for the existence of its library book id and book status id
		body("cartItems.*.library_book_id").custom(async (value, {req}) => await validateKeyExists("libraryBook", value, "library_books")),
		body("cartItems.*.book_status_id").custom(async (value, {req}) => await validateKeyExists("bookStatus", value, "book_statuses")),
	]
	return validationRules
}

module.exports = {
	validatePost: checkoutValidator()
}
