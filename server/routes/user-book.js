const express = require("express")
const router = express.Router()
const { 
	validateGet, 
	validateReturn,
}  = require("../validation/user-book")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		const {id: userId} = req.user
		let userBooks = await db("user_books")
		.where("user_id", userId)
		.select(
			"user_books.id as id",
			"user_books.library_book_id as libraryBookId",
			"user_books.date_borrowed as dateBorrowed",
			"user_books.date_due as dateDue",
			"user_books.date_returned as dateReturned",
			"user_books.created_at as createdAt"
		)
		res.json(userBooks)
	}	
	catch (err) {
		console.log(`Error while getting User Books: ${err.message}`)	
		next(err)
	}	
})

router.get("/:userBookId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const {id: userId} = req.user
		const userBooks = await db("user_books")
		.where("id", req.params.userBookId)
		.where("user_id", userId)
		.select(
			"user_books.id as id",
			"user_books.library_book_id as libraryBookId",
			"user_books.date_borrowed as dateBorrowed",
			"user_books.date_due as dateDue",
			"user_books.date_returned as dateReturned",
			"user_books.created_at as createdAt"
		)
		res.json(userBooks)
	}	
	catch (err) {
		console.log(`Error while getting User Books: ${err.message}`)	
		next(err)
	}
})

router.post("/return", validateReturn, handleValidationResult, async (req, res, next) => {
	try {
		await db.transaction(async (trx) => {
			const userBookUpdates = req.body.books.map((book) => (
				{
					user_book_id: book.user_book_id
				}
			))
			const queries = userBookUpdates.map((item) =>{
				return trx('user_books')
				.where('id', item.user_book_id)
				.update({ date_returned: new Date() })
			});

			await Promise.all(queries);
		})

		await db.transaction(async (trx) => {
			const libraryBookUpdates = req.body.books.map((book) => (
				{
					library_book_id: book.library_book_id,
					book_status_id: book.book_status_id,
				}
			))
			const queries = libraryBookUpdates.map((item) => {
				return trx("library_books").where("id", item.library_book_id)
				.update({ book_status_id: item.book_status_id})
			})
			await Promise.all(queries)
		})

		res.json({message: "Books returned successfully!"})	
	}	
	catch (err) {
		console.error(`Error while updating Books: ${err.message}`)
		next(err)
	}
})

module.exports = router
