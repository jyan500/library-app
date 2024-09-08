const db = require("../db/db")
const { isValidURL, validateKeyExists } = require("./helper")
const { BULK_INSERT_LIMIT } = require("../constants")
const { body, param } = require("express-validator")

const checkoutValidator = (actionType) => {
	/* 
	TODO: need user borrow history to track the "order" for a user,
	keeps track of all books that were borrowed for this order by putting
	FK on user_books table

	this is necessary because a user may borrow and then return
	the same book multiple times, so there needs to be a way to distinguish
	the records

	table: user_borrow_history
	id
	transaction_num (new Date().valueOf)
	user_id
	created_at	  	
	updated_at

	user_books
	add FK user_borrow_history_id

	*/

	let validationRules = []
	// if update or delete route, validate the ID and make sure board exists
	if (actionType === "post" || actionType === "update" || actionType === "delete"){
		validationRules = [
			...validationRules,
			body("bookId").custom(async (value, {req}) => await validateKeyExists("book", value, "books"))
		]
	}
	return validationRules
}

module.exports = {
	validateGet: checkoutValidator("get"),
	validatePost: checkoutValidator("post")
}
