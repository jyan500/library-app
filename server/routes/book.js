const express = require("express")
const router = express.Router()
const { 
	validateGet, 
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/book")
const { handleValidationResult }  = require("../middleware/validationMiddleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.get("/", async (req, res, next) => {
	try {
		const books = await db("boards").where("id", req.params.bookId).select(
			"books.id as id",
			"books.title as tltle",
			"books.image_url as imageUrl",
			"books.genre_id as genreUrl",
			"books.author as author",
		)
		res.json(books)
	}	
	catch (err) {
		console.log(`Error while getting Boards: ${err.message}`)	
		next(err)
	}	
})

router.get("/:bookId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const books = await db("boards").where("id", req.params.bookId).select(
			"books.id as id",
			"books.title as tltle",
			"books.image_url as imageUrl",
			"books.genre_id as genreUrl",
			"books.author as author",
		)
		res.json(books)
	}	
	catch (err) {
		console.log(`Error while getting Boards: ${err.message}`)	
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

module.exports = router
