const express = require("express")
const router = express.Router()
const { 
	validateGet, 
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/checkout")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

router.post("/", validatePost, handleValidationResult, async (req, res, next) => {
	try {
	}	
	catch (err) {
		console.log(`Error while checking out books: ${err.message}`)
	}
})

module.exports = router
