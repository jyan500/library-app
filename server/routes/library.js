const express = require("express")
const router = express.Router()
const { 
	validateGet, 
}  = require("../validation/library")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.get("/", async (req, res, next) => {
	try {
		let libraries = await db("libraries").select(
			"libraries.id as id",
			"libraries.name as name",
			"libraries.image_url as imageURL",
			"libraries.address as address",
			"libraries.city as city",
			"libraries.zipcode as zipcode",
			"libraries.state as state",
		)
		res.json(libraries)
	}	
	catch (err) {
		console.log(`Error while getting libraries: ${err.message}`)	
		next(err)
	}	
})

router.get("/:libraryId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const libraries = await db("libraries").where("id", req.params.libraryId).select(
			"libraries.id as id",
			"libraries.name as name",
			"libraries.image_url as imageURL",
			"libraries.address as address",
			"libraries.city as city",
			"libraries.zipcode as zipcode",
			"libraries.state as state",
		)
		res.json(libraries)
	}	
	catch (err) {
		console.log(`Error while getting libraries: ${err.message}`)	
		next(err)
	}
})


module.exports = router
