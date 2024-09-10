const express = require("express")
const router = express.Router()
const { 
	validateCheckoutValidate, 
	validateCheckoutSubmit,
	validateCheckoutCancel,
}  = require("../validation/checkout")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 
const { CART_SESSION_MINUTE_TIME_LIMIT, BOOK_CHECKOUT_NUM_DAYS } = require("../constants")
const ShortUniqueId = require('short-unique-id')

const getBookAvailabilityFromCart = async (userId, cartItems) => {
	const available = await db("book_statuses").where("name", "Available").first()
	/* 
	A book is available IF
	1) most recent cart exists on the backend AND the book is already in the user's cart
	2) the book's status is available
	*/
	const userCart = await db("user_carts").where("user_id", userId).orderBy("id", "desc").first()
	let userCartItems = []
	if (userCart){
		userCartItems = await db("user_cart_items").where("user_cart_id", userCart.id)
	}
	const libraryBooks = Promise.all(cartItems.map(async (cartItem) => {
		try {
			const libraryBook = await db("library_books").where("id", cartItem.library_book_id).first()
			const cartItemExists = userCartItems.find((userCartItem) => cartItem.library_book_id === userCartItem.library_book_id) != null
			return {
				cartItemId: cartItem.cart_item_id, 
				bookStatusId: libraryBook?.book_status_id, 
				canCheckout: libraryBook?.book_status_id === available?.id || cartItemExists
			}
		}
		catch (err) {
			return {
				cartItemId: cartItem.cart_item_id, 
				bookStatusId: cartItem.library_book_id, 
				canCheckout: false
			}
		}
	}))
	return libraryBooks
}

router.post("/validate", validateCheckoutValidate, handleValidationResult, async (req, res, next) => {
	try {
		const { id: userId} = req.user
		const cartItems = req.body.cart_items
		const result = await getBookAvailabilityFromCart(userId, cartItems)
		const cannotCheckout = result.filter((item) => !item.canCheckout)
		if (cannotCheckout.length === 0){
			const sessionStart = new Date()
			const sessionEnd = new Date()
			// cart session ends in 10 minutes
			sessionEnd.setMinutes(sessionEnd.getMinutes() + CART_SESSION_MINUTE_TIME_LIMIT)
			const onHold = await db("book_statuses").where("name", "On Hold").first()
			const existingCart = await db("user_carts").where("user_id", userId).first()
			/* 
			  if there's a cart session that already exists for this user and
			  the current time is within session start and session end of the existing cart,
			  use the existing cart
			*/
			let useCartId;
			if (existingCart && sessionStart >= existingCart?.session_start && sessionStart <= existingCart?.session_end){
				// delete existing cart items
				useCartId = existingCart.id
				await db("user_cart_items").where("user_cart_id", useCartId).del()
				/* 
					update the session start and session end to updates times on the existing cart
					to prolong the session in case the checkout page is re-accessed after getting kicked out of the page
					(due to page refresh)
				*/
				await db("user_carts").where("id", existingCart.id).update({
					session_start: sessionStart, 
					session_end: sessionEnd
				})
			}
			else {
				// create new cart
				const cartId = await db("user_carts").insert({
					user_id: userId,
					session_start: sessionStart,
					session_end: sessionEnd
				}, ["id"])

				useCartId = cartId[0]
			}
			if (useCartId){
				// add new cart items
				await db("user_cart_items").insert(cartItems.map((cartItem) => {
					return {
						library_book_id: cartItem.library_book_id,
						user_cart_id: useCartId
					}	
				}))
			}
			// set the library books to "on hold" status
			await db("library_books").update({"book_status_id": onHold.id}).whereIn("id", cartItems.map((cartItem) => cartItem.library_book_id))
			res.json({
				cartId: useCartId, 
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

router.post("/submit", validateCheckoutSubmit, handleValidationResult, async (req, res, next) => {
	try {
		const {id: userId} = req.user
		const cartItems = req.body.cart_items
		const cartId = req.body.cart_id
		const result = await getBookAvailabilityFromCart(userId, cartItems)		
		const cannotCheckout = result.filter((item) => !item.canCheckout)
		const cart = await db("user_carts").where("id", cartId).first()
		const curDate = new Date()

		const sessionExpired = curDate > cart?.session_end
		const borrowedStatus = await db("book_statuses").where("name", "Borrowed").first()
		if (cannotCheckout.length === 0 && !sessionExpired) {
			const dateDue = new Date()
			// books are due in two weeks
			dateDue.setDate(dateDue.getDate() + BOOK_CHECKOUT_NUM_DAYS)
			const { randomUUID } = new ShortUniqueId({length: 10})
			const borrowHistoryId = await db("user_borrow_history").insert({
				user_id: userId,
				transaction_num: randomUUID()
			}, ["id"])
			await db("user_books").insert(cartItems.map((cartItem) => {
				return {
					user_id: userId,
					library_book_id: cartItem.library_book_id,
					user_borrow_history_id: borrowHistoryId[0],
					date_borrowed: new Date(),
					date_due: dateDue,
				}
			}))
			// update books to proper status
			await db("library_books").update({"book_status_id": borrowedStatus.id}).whereIn("id", cartItems.map((cartItem) => cartItem.library_book_id))

			// delete the cart and all cart items
			await db("user_cart_items").where("user_cart_id", req.body.cart_id).del()
			await db("user_carts").where("id", req.body.cart_id).del()
		
			res.json({userBorrowHistoryId: borrowHistoryId[0], message: "Books have been checked out successfully!"})
		}
		/* 
			If one of the books is no longer available, OR the session end time
			has been passed, the transaction should fail
		*/	
		else {
			res.status(400).json({errors: [sessionExpired ? "Session has expired." : "One or more items were no longer available."]})
		}
	}	
	catch (err){
		console.log(`Error while checking out books: ${err.message}`)
	}
})

router.post("/cancel", validateCheckoutCancel, handleValidationResult, async (req, res, next) => {
	try {

		const {id: userId} = req.user
		const cartItems = await db("user_cart_items").where("user_cart_id", req.body.cart_id)
		const availableStatus = await db("book_statuses").where("name", "Available").first()
		// update the library book status back to "available"
		await db("library_books").update({
			book_status_id: availableStatus?.id,
		}).whereIn("id", cartItems.map((cartItem) => cartItem.library_book_id))
		// delete the cart and all cart items
		await db("user_cart_items").where("user_cart_id", req.body.cart_id).del()
		await db("user_carts").where("id", req.body.cart_id).del()
		res.json({message: "Checkout has been cancelled"})
	}
	catch (err) {
		console.log(`Error while cancelling checkout: ${err.message}`)
	}
})

module.exports = router
