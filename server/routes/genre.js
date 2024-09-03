const express = require("express")
const router = express.Router()
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		const genres = await db("genres").select(
			"genres.id as id",
			"genres.name as name",
		)
		res.json(genres)
	}	
	catch (err) {
		console.log(`Error while getting Genres: ${err.message}`)	
		next(err)
	}	
})

module.exports = router
