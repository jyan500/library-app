const express = require("express")
const router = express.Router()
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		const book_statuses = await db("book_statuses").select(
			"book_statuses.id as id",
			"book_statuses.name as name",
		)
		res.json(book_statuses)
	}	
	catch (err) {
		console.log(`Error while getting book_statuses: ${err.message}`)	
		next(err)
	}	
})

module.exports = router
