const express = require("express")
const router = express.Router()
const { 
	validateGet, 
}  = require("../validation/user-borrow-history")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		const {id: userId} = req.user
		let userBorrowHistory = await db("user_borrow_history")
		.where("user_id", userId)
		.select(
			"user_borrow_history.id as id",
			"user_borrow_history.transaction_num as transactionNum",
			"user_borrow_history.created_at as createdAt"
		)
		res.json(userBorrowHistory)
	}	
	catch (err) {
		console.log(`Error while getting User Borrow History: ${err.message}`)	
		next(err)
	}	
})

router.get("/:historyId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const {id: userId} = req.user
		const userBorrowHistory = await db("user_borrow_history")
		.where("id", req.params.historyId)
		.where("user_id", userId)
		.select(
			"user_borrow_history.id as id",
			"user_borrow_history.transaction_num as transactionNum",
			"user_borrow_history.created_at as createdAt"
		)
		res.json(userBorrowHistory)
	}	
	catch (err) {
		console.log(`Error while getting User Borrow History: ${err.message}`)	
		next(err)
	}
})

module.exports = router
