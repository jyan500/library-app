const express = require("express")
const router = express.Router()
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		const genres = await db("news_post_genres").select(
			"news_post_genres.id as id",
			"news_post_genres.name as name",
		)
		res.json(genres)
	}	
	catch (err) {
		console.log(`Error while getting News Post Genres: ${err.message}`)	
		next(err)
	}	
})

module.exports = router
