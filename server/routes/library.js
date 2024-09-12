const express = require("express")
const router = express.Router()
const { 
	validateGet, 
}  = require("../validation/library")
const { handleValidationResult }  = require("../middleware/validation-middleware")
const db = require("../db/db")
const { mapIdToRowAggregateArray, mapIdToRowObject } = require("../helpers/functions") 

const getLibraryHourStatus = async (libraryId) => {
	/* 
		TODO: 
		BETWEEN works because the end hour is always greater than the start hour for library hours.
		if the start hour is greater than the end hour due to the hours crossing midnight,
		an additional subquery will be required.
	*/
	const currentTime = db.raw("TIME(NOW())");
	const dayOfWeek = db.raw("DAYOFWEEK(CURDATE())")
	const isOpen = await db("library_hours")
	.where("library_id", libraryId)
	.where("day", dayOfWeek)
	.whereRaw('? BETWEEN start_hour AND end_hour', [currentTime])
	.select(
		"library_hours.id as id",
		"library_hours.day as day", 
		"library_hours.start_hour as startHour",
		"library_hours.end_hour as endHour")
	.first()

	let nextClosing;
	let nextOpening;
	if (!isOpen){
		// find the next closest opening hour
		nextOpening = await db("library_hours").where("library_id", libraryId)
		.where("day", dayOfWeek)
		.where("start_hour", ">", currentTime)
		.orderBy("day", "asc")
		.select(
			"library_hours.id as id",
			"library_hours.day as day", 
			"library_hours.start_hour as startHour",
			"library_hours.end_hour as endHour")
		.first()

		// if there's no opening for today, get the next closest date in the future
		if (!nextOpening){
			nextOpening = await db("library_hours").where("library_id", libraryId)
			.where("day", ">", dayOfWeek)
			.orderBy("day", "asc")
			.select(
				"library_hours.id as id",
				"library_hours.day as day", 
				"library_hours.start_hour as startHour",
				"library_hours.end_hour as endHour"
			)
			.first()
		}
	}
	else {
		nextClosing = isOpen
	}

	return {
		isOpen: isOpen != null,
		...(isOpen ? {nextClosing: nextClosing} : {}),
		...(!isOpen ? {nextOpening: nextOpening} : {}),
	}
}

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
		if (req.query.hours){
			Promise.all(libraries.map(async (library) => {
				const hoursStatus = await getLibraryHourStatus(library.id)
				return {
					...library,
					libraryHourStatus: hoursStatus
				}
			})).then((result) => {
				res.json(result)
			})
		}
		else {
			res.json(libraries)
		}
	}	
	catch (err) {
		console.log(`Error while getting libraries: ${err.message}`)	
		next(err)
	}	
})

router.get("/:libraryId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const library = await db("libraries").where("id", req.params.libraryId).select(
			"libraries.id as id",
			"libraries.name as name",
			"libraries.image_url as imageURL",
			"libraries.address as address",
			"libraries.city as city",
			"libraries.zipcode as zipcode",
			"libraries.state as state",
		).first()
		let hours;
		let hoursStatus;
		if (req.query.hours){
			hours = await db("library_hours").where("library_id", req.params.libraryId).select(
				"library_hours.id as id",
				"library_hours.library_id as libraryId",
				"library_hours.day as day",
				"library_hours.start_hour as startHour",
				"library_hours.end_hour as endHour",
			)
			hoursStatus = await getLibraryHourStatus(library.id)
		}
		res.json([{
			...library,
			...(req.query.hours ? {
				hours: hours,
				libraryHourStatus: hoursStatus
			} : {}),
		}])
	}	
	catch (err) {
		console.log(`Error while getting libraries: ${err.message}`)	
		next(err)
	}
})


module.exports = router
