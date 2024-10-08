const express = require("express")
const router = express.Router()
const { 
	validateGet, 
}  = require("../validation/user-borrow-history")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")

const getAllBooksForHistoryEntry = async ({userBorrowHistoryId, onlyBorrowed}) => {
	const books = await db("user_books")
		.join("library_books", "library_books.id", "=", "user_books.library_book_id")
		.join("books", "library_books.book_id", "=", "books.id")
		.where("user_borrow_history_id", userBorrowHistoryId).modify((queryBuilder) => {
			if (onlyBorrowed){
				queryBuilder.whereNull("user_books.date_returned")
			}
		})
		.select(
			"books.id",
			"books.title as title",
			"books.genre_id as genreId",
			"books.author as author",
			"books.image_url as imageURL",
			"user_books.date_due as dateDue",
			"user_books.date_returned as dateReturned",
			"user_books.id as userBookId",
			"library_books.id as libraryBookId",
			"library_books.book_status_id as bookStatusId",
			"library_books.library_id as libraryId"
		)	
	return books
}

router.get("/", async (req, res, next) => {
	try {
		const {id: userId} = req.user
		let userBorrowHistory = await db("user_borrow_history")
		.where("user_id", userId)
		.select(
			"user_borrow_history.id as id",
			"user_borrow_history.transaction_num as transactionNum",
			"user_borrow_history.created_at as createdAt"
		).orderBy("created_at", "desc")
		.paginate({ perPage: 5, currentPage: req.query.page ? parseInt(req.query.page) : 1, isLengthAware: true})
		res.json(userBorrowHistory)
	}	
	catch (err) {
		console.log(`Error while getting User Borrow History: ${err.message}`)	
		next(err)
	}	
})

router.get("/recent", async (req, res, next) => {
	try {
		const {id: userId} = req.user
		let books = []
		// get the most recent borrow history where the history contains at least one book that
		// is still borrowed (date return is still null)
		const userBorrowHistory = await db("user_borrow_history")
		.join("user_books", "user_books.user_borrow_history_id", "user_borrow_history.id")
		.whereNull("user_books.date_returned")
		.where("user_borrow_history.user_id", userId)
		.orderBy("user_borrow_history.created_at", "desc")
		.limit(1)
		.select(
			"user_borrow_history.id as id",
			"user_borrow_history.transaction_num as transactionNum",
			"user_borrow_history.created_at as createdAt",
		).first()
		if (userBorrowHistory && req.query.books){
			books = await getAllBooksForHistoryEntry({userBorrowHistoryId: userBorrowHistory.id, onlyBorrowed: true})
		}
		res.json([{
			...userBorrowHistory,
			...(req.query.books ? {books: books} : {})
		}])
	}	
	catch (err) {
		console.log(`Error while getting User Borrow History: ${err.message}`)	
		next(err)
	}
})

router.get("/:historyId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const {id: userId} = req.user
		let books = []
		const userBorrowHistory = await db("user_borrow_history")
		.where("user_borrow_history.id", req.params.historyId)
		.select(
			"user_borrow_history.id as id",
			"user_borrow_history.transaction_num as transactionNum",
			"user_borrow_history.created_at as createdAt",

		).first()
		if (userBorrowHistory && req.query.books){
			books = await getAllBooksForHistoryEntry({userBorrowHistoryId: userBorrowHistory.id, onlyBorrowed: false})
		}
		res.json([{
			...userBorrowHistory,
			...(req.query.books ? {books: books} : {})
		}])
	}	
	catch (err) {
		console.log(`Error while getting User Borrow History: ${err.message}`)	
		next(err)
	}
})

module.exports = router
