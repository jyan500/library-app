const express = require("express")
const router = express.Router()
const { 
	validatePost, 
}  = require("../validation/checkout")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

const getBookAvailabilityFromCart = async (cartItems) => {
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
	}))
	return libraryBooks
}

router.post("/validate", validatePost, handleValidationResult, async (req, res, next) => {
	try {
		const { id: userId} = req.user
		const cartItems = req.body.cartItems
		const result = await getBookAvailabilityFromCart(cartItems)
		const cannotCheckout = result.filter((item) => !item.canCheckout)
		if (cannotCheckout.length === 0){
			const sessionStart = new Date()
			const sessionEnd = new Date()
			sessionEnd.setMinutes(sessionEnd.getMinutes() + 10)

			const onHold = await db("book_statuses").where("name", "On Hold").first()
			// create cart and cart items
			const cart = await db("user_carts").insert({
				user_id: userId,
				session_start: sessionStart,
				session_end: sessionEnd
			}, [id])
			const cartItems = await db("user_cart_items").insert(cartItems.map((cartItem) => {
				return {
					library_book_id,
					user_cart_id: cart[0].id,
				}
			}))
			// set the library books to "on hold" status
			await db("library_books").update({"book_status_id": onHold.id}).whereIn("id", cartItems.map((cartItem) => cartItem.library_book_id))
			res.json({
				cartId: cart[0].id, 
				sessionEnd: sessionEnd, 
				message: "Checkout has been validated and cart session has started!"
			})
		}
		else {
			// figure out which book had the canCheckout = false
			res.status(400).json({errors: cannotCheckout})
		}	
	}	
	catch (err) {
		console.log(`Error while checking out books: ${err.message}`)
	}
})

router.post("/submit", validatePost, handleValidationResult, async (req, res, next) => {
	try {
		const cartItems = req.body.cartItems
		const result = await getBookAvailabilityFromCart(cartItems)
		const cannotCheckout = result.filter((item) => !item.canCheckout)
	}	
	catch (err){
		console.log(`Error while checking out books: ${err.message}`)
	}
})

module.exports = router
