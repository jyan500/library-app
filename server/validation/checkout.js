const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const checkoutValidator = (type) => {
	let validationRules = []
	if (type === "cancel" || type === "submit"){
		validationRules = [
			...validationRules,
			body("cart_id").custom(async (value, {req}) => await validateKeyExists("cart", value, "user_carts"))
		]
	}
	if (type === "validate" || type === "submit"){
		validationRules = [
			...validationRules,
			// cartItems must be an array
			body("cart_items").isArray({min: 1, max: BULK_INSERT_LIMIT})
			.withMessage("Cart Items must be an array")
			.withMessage(`Cart Items cannot have more than ${BULK_INSERT_LIMIT} items`),
			// for each cartItem, check for the existence of its library book id and book status id
			body("cart_items.*.library_book_id").custom(async (value, {req}) => await validateKeyExists("libraryBook", value, "library_books")),
			body("cart_items.*.book_status_id").custom(async (value, {req}) => await validateKeyExists("bookStatus", value, "book_statuses")),
		]
	}
	return validationRules
}

module.exports = {
	validateCheckoutValidate: checkoutValidator("validate"),
	validateCheckoutSubmit: checkoutValidator("submit"),
	validateCheckoutCancel: checkoutValidator("cancel"),
}
