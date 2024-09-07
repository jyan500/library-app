const express = require("express")
const router = express.Router()
const { 
	validateGet, 
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/book")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.get("/", async (req, res, next) => {
	try {
		let books = await db("books").modify((queryBuilder) => {
			if (req.query.query && req.query.searchBy){
				const q = decodeURIComponent(req.query.query)
				/* not case sensitive search */
				if (req.query.searchBy === "genre"){
					queryBuilder.join("genres", "genres.id", "=", "books.genre_id").whereILike("genres.name", `%${q}%`)
				}
				else if (req.query.searchBy === "title"){
					queryBuilder.whereILike("title", `%${q}%`)
				}
				else if (req.query.searchBy === "author"){
					queryBuilder.whereILike("author", `%${q}%`)
				}
			}
		}).select(
			"books.id as id",
			"books.title as title",
			"books.image_url as imageURL",
			"books.genre_id as genreId",
			"books.author as author",
		).paginate({ perPage: 10, currentPage: req.query.page ? parseInt(req.query.page) : 1, isLengthAware: true});
		res.json(books)
	}	
	catch (err) {
		console.log(`Error while getting books: ${err.message}`)	
		next(err)
	}	
})

router.get("/:bookId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const books = await db("books").where("id", req.params.bookId).select(
			"books.id as id",
			"books.title as title",
			"books.image_url as imageURL",
			"books.genre_id as genreId",
			"books.author as author",
		)
		res.json(books)
	}	
	catch (err) {
		console.log(`Error while getting books: ${err.message}`)	
		next(err)
	}
})

router.post("/", validateCreate, handleValidationResult, async (req, res, next) => {
	try {
		const id = await db("books").insert({
			title: req.body.title,
			genre_id: req.body.genre_id,
			image_url: req.body.image_url,
			author: req.body.author
		},["id"])
		res.json({id: id[0], message: "Book inserted successfully!"})
	}	
	catch (err) {
		console.error(`Error while creating Book: ${err.message}`)
		next(err)
	}
})

router.put("/:bookId", validateUpdate, handleValidationResult, async (req, res, next) => {
	try {
		await db("books").where("id", req.params.bookId).update({
			title: req.body.title,
			genre_id: req.body.genre_id,
			image_url: req.body.image_url,
			author: req.body.author
		})
		res.json({message: "Book updated successfully!"})	
	}	
	catch (err) {
		console.error(`Error while updating Book: ${err.message}`)
		next(err)
	}
})

router.delete("/:bookId", validateDelete, handleValidationResult, async (req, res, next) => {
	try {
		await db("books").where("id", req.params.bookId).del()
		res.json({message: "Book deleted successfully!"})
	}
	catch (err){
		console.log(`Error while deleting book: ${err.message}`)
		next(err)
	}
})

router.get("/:bookId/library", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const librariesFromBook = await db('library_books')
		/* 
			left join with user_books to find the most recent instance of the book
			being checked out in order to retrieve its due date
		*/
		.leftJoin(
			db('user_books')
			.select('user_books.library_book_id')
			.max('user_books.date_due as date_due')
			.groupBy('user_books.library_book_id')
			.as('ub'),
			'ub.library_book_id',
			'library_books.id'
		).where("library_books.book_id", req.params.bookId)
		.select(
			"library_books.id as id",
			"library_books.book_id as bookId",
			"library_books.library_id as libraryId",
			"library_books.book_status_id as bookStatusId",
			"date_due as dateDue"
		)
		res.json(librariesFromBook)
	}	
	catch (err) {
		console.log(`Error while getting libraries from book: ${err.message}`)
	}
})

module.exports = router
