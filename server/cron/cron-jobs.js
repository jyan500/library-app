const db = require("../db/db")

/* 
delete carts where the current time > session end time for the cart
to purge any checkout sessions that were never completed
*/
const deleteExpiredCarts = async () => {
	try {
		const expiredCartItems = await db("user_carts")
		.where("session_end", "<", db.fn.now())
		.join("user_cart_items", "user_cart_items.user_cart_id", "=", "user_carts.id")
		.select("user_cart_items.*")
		const availableStatus = await db("book_statuses").where("name", "Available").first()
		if (expiredCartItems.length && availableStatus){
			// bulk update all library books that are on the user's carts
			// and set them to available
			await db.transaction(async (trx) => {
				const libraryBookUpdates = expiredCartItems.map((cartItems) => (
					{
						library_book_id: cartItems.library_book_id,
					}
				))
				const queries = libraryBookUpdates.map((item) => {
					return trx("library_books").where("id", item.library_book_id)
					.update({ book_status_id: availableStatus.id})
				})
				await Promise.all(queries)
			})
		}
		// delete all cart items that are on expired carts
		await db("user_cart_items").whereIn("id", expiredCartItems.map((cartItem)=>cartItem.id)).del()
		// delete all carts that are expired
		await db("user_carts").where("session_end", "<", db.fn.now()).del()
		console.log(`Deleted ${expiredCartItems.length} cart items`)
	}
	catch (err){
		console.log(`Error in cron job: deleteExpiredCarts ${err}`)
	}
}

/* 
check to see if book is not returned,
and current date >= dueDate
if so, set the return date to be current date
and set the library book to available
*/
const returnBooksPastDueDate = async () => {
	try {
		const userBooksDue = await db("user_books")
		.whereNull("date_returned")
		.where("date_due", "<", db.fn.now())
		const availableStatus = await db("book_statuses").where("name", "Available").first()
		if (userBooksDue.length && availableStatus){

			await db("user_books").update({
				"date_returned": db.fn.now()
			}).whereIn("id", userBooksDue.map((userBook) => userBook.id))

			await db.transaction(async (trx) => {
				const libraryBookUpdates = userBooksDue.map((book) => (
					{
						library_book_id: book.library_book_id,
					}
				))
				const queries = libraryBookUpdates.map((item) => {
					return trx("library_books").where("id", item.library_book_id)
					.update({ book_status_id: availableStatus.id})
				})
				await Promise.all(queries)
			})
		}
		console.log(`Returned ${userBooksDue.length} books`)
	}
	catch (err){
		console.log(`Error in cron job: returnBooksPastDueDate ${err}`)
	}
}

module.exports = {
	deleteExpiredCarts,
	returnBooksPastDueDate
}