const express = require("express")
const router = express.Router()
const { 
	validateGet, 
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/news-post")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.get("/", async (req, res, next) => {
	try {
		const posts = await db("news_posts").modify(async (queryBuilder) => {
			if ("newsPostGenreId" in req.query && req.query.newsPostGenreId !== "") {
				queryBuilder.where("news_post_genre_id", req.query.newsPostGenreId)
			}	
		}).select(
			"news_posts.id as id",
			"news_posts.title as title",
			"news_posts.image_url as imageURL",
			"news_posts.description as description",
			"news_posts.news_post_genre_id as newsPostGenreId"
		).limit(10)
		res.json(posts)
	}	
	catch (err) {
		console.log(`Error while getting News Posts: ${err.message}`)	
		next(err)
	}	
})

router.get("/:bookId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const posts = await db("news_posts").select(
			"news_posts.id as id",
			"news_posts.title as title",
			"news_posts.image_url as imageURL",
			"news_posts.description as description",
			"news_posts.news_post_genre_id as newsPostGenreId"
		)
		res.json(posts)
	}	
	catch (err) {
		console.log(`Error while getting News Posts: ${err.message}`)	
		next(err)
	}
})

router.post("/", validateCreate, handleValidationResult, async (req, res, next) => {
	try {
		const id = await db("news_posts").insert({
			title: req.body.title,
			image_url: req.body.image_url,
		},["id"])
		res.json({id: id[0], message: "News Post inserted successfully!"})
	}	
	catch (err) {
		console.error(`Error while creating News Post: ${err.message}`)
		next(err)
	}
})

router.put("/:newsId", validateUpdate, handleValidationResult, async (req, res, next) => {
	try {
		await db("news_posts").where("id", req.params.newsId).update({
			title: req.body.title,
			image_url: req.body.image_url,
		})
		res.json({message: "News Post updated successfully!"})	
	}	
	catch (err) {
		console.error(`Error while updating News Post: ${err.message}`)
		next(err)
	}
})

router.delete("/:newsId", validateDelete, handleValidationResult, async (req, res, next) => {
	try {
		await db("news_posts").where("id", req.params.newsId).del()
		res.json({message: "News Post deleted successfully!"})
	}
	catch (err){
		console.log(`Error while deleting News Post: ${err.message}`)
		next(err)
	}
})

module.exports = router
