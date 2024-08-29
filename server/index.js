require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000
const bookRouter = require("./routes/book")
const userProfileRouter = require("./routes/userProfile")
const userRouter = require("./routes/user")
const userRoleRouter = require("./routes/userRole")
const auth = require("./middleware/authMiddleware")


const api = (route, apiVersion = "") => {
	return `/api${apiVersion}/${route}`
}

// JSON parser middleware
app.use(express.json())
app.use(cors())

app.use(
	express.urlencoded({
		extended: true	
	})
)

/* Protected Endpoints */
app.use(api("book"), auth.authenticateToken, bookRouter)
app.use(api("user-profile"), auth.authenticateToken, userProfileRouter)
app.use(api("user-role"), auth.authenticateToken, userRoleRouter)

/* Public Endpoints */
app.use(api("user"), userRouter)

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	console.error(err.message, err.stack)
	res.status(statusCode).json({message: err.message})
	return
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app