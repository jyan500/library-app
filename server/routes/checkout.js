const express = require("express")
const router = express.Router()
const { 
	validatePost, 
}  = require("../validation/checkout")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.post("/", validatePost, handleValidationResult, async (req, res, next) => {
	try {
		const cartItems = req.body.cartItems
		const available = await db("book_statuses").where("name", "Available").first()
		const libraryBooks = Promise.all(cartItems.map(async (cartItem) => {
			try {
				const libraryBook = await db("library_books").where("id", cartItem.library_book_id).first()
				return {
					cartId: cartItem.cart_id, 
					bookStatusId: libraryBook?.book_status_id, 
					canCheckout: libraryBook?.book_status_id === available?.id}
			}
			catch {
				return {
					cartId: cartItem.cart_id, 
					bookStatusId: cartItem.library_book_id, 
					canCheckout: false
				}
			}
		})).then((result) => {
			const cannotCheckout = result.filter((item) => !item.canCheckout)
			if (cannotCheckout.length === 0){
				res.json({id: 0, message: "Books have been checked out successfuly!"})
			}
			else {
				// figure out which book had the canCheckout = false
				res.status(400).json({errors: cannotCheckout})
			}	
		})
	}	
	catch (err) {
		console.log(`Error while checking out books: ${err.message}`)
	}
})

module.exports = router
