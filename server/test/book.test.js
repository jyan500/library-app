process.env.NODE_ENV = 'test'

var chai = require("chai")
var chaiHttp = require("chai-http")
var should = chai.should()
var { 
	createTokenForUserRole 
} = require("../helpers/test-helpers")
var { assert } = chai

// use temporary server
chai.use(chaiHttp)

var app = require("../index")
var db = require("../db/db")

describe("routes: book", function() {

	let token;
	beforeEach(function(done) {
		db.migrate.rollback()
		.then(function() {
			db.migrate.latest()
			.then(function() {
				return db.seed.run().then(function() {
					createTokenForUserRole(
						"Jansen", 
						"Yan",
						"jansen@jansen-test-company.com",
						"Test123!",
						"USER",
					).then(function(res){
						token = res
						done()
					});
				});
			})
		});
	});

	afterEach(function(done) {
		db.migrate.rollback()
		.then(function() {
			done();
		});
	});

	describe("/api/book", () => {
		it("should get book", async () => {
			await db("books").insert({
				"title": "Book #1",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			})
			const res = await chai.request(app).get("/api/book").set({"Authorization": `Bearer ${token}`})
			res.status.should.equal(200)
			res.type.should.equal("application/json")
			const body = JSON.parse(res.text)
			assert.equal(body.length === 1, true)
		})	
		it("should get book by ID", async () => {
			await db("books").insert({
				"title": "Book #1",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			})
			const res = await chai.request(app).get("/api/book/1").set({"Authorization": `Bearer ${token}`})	
			res.status.should.equal(200)	
			res.type.should.equal("application/json")
			const body = JSON.parse(res.text)
			assert.equal(body.length === 1, true)
		})
		it("should insert book", async () => {
			const payload = {
				"title": "Book #1",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			}
			const res = await chai.request(app).post("/api/book").set({"Authorization": `Bearer ${token}`}).send(payload)
			res.status.should.equal(200)
			res.type.should.equal("application/json")
			const newBook = await db("books").where("name", "Book #1").first()
			assert.equal(newBook != null, true)
			assert.equal(newBook.title, "Book #1")
		})
		it("should update book", async () => {
			const id = await db("books").insert({
				"title": "Book #1",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			}, ["id"])
			const payload = {
				"title": "Book #2",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			}
			const res = await chai.request(app).put(`/api/book/${id[0]}`).set({"Authorization": `Bearer ${token}`}).send(payload)
			res.status.should.equal(200)
			res.type.should.equal("application/json")
			const newBook = await db("books").where("id", id[0]).first()
			assert.equal(newBook != null, true)
			assert.equal(newBook.title, "Book #2")
		})
		it("should delete book", async () => {
			const id = await db("books").insert({
				"title": "Book #2",
				"image_url": "https://www.google.com",
				"genre_id": 1,
				"author": "Jansen Yan"
			}, ["id"])	
			const res = await chai.request(app).delete(`/api/book/${id[0]}`).set({"Authorization": `Bearer ${token}`})
			res.status.should.equal(200)
			res.type.should.equal("application/json")
			const book = await db("books").where("id", id[0]).first()
			// book should be deleted
			assert.equal(book == null, true)
		})
	})
})


