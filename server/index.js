require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000
const bookRouter = require("./routes/book")
const userProfileRouter = require("./routes/user-profile")
const userRouter = require("./routes/user")
const userRoleRouter = require("./routes/user-role")
const newsPostRouter = require("./routes/news-post")
const genreRouter = require("./routes/genre")
const newsPostGenreRouter = require("./routes/news-post-genre")
const bookStatusRouter = require("./routes/book-status")
const libraryRouter = require("./routes/library")
const checkoutRouter = require("./routes/checkout")
const userBorrowHistoryRouter = require("./routes/user-borrow-history")
const userBookRouter = require("./routes/user-book")
const auth = require("./middleware/auth-middleware")

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
app.use(api("genre"), auth.authenticateToken, genreRouter)
app.use(api("news-post"), auth.authenticateToken, newsPostRouter)
app.use(api("news-post-genre"), auth.authenticateToken, newsPostGenreRouter)
app.use(api("library"), auth.authenticateToken, libraryRouter)
app.use(api("book-status"), auth.authenticateToken, bookStatusRouter)
app.use(api("checkout"), auth.authenticateToken, checkoutRouter)
app.use(api("user-borrow-history"), auth.authenticateToken, userBorrowHistoryRouter)
app.use(api("user-book"), auth.authenticateToken, userBookRouter)

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