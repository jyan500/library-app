process.env.NODE_ENV = 'test'

var chai = require("chai")
var chaiHttp = require("chai-http")
var should = chai.should()
var { assert } = chai

// use temporary server
chai.use(chaiHttp)

var app = require("../index")
var db = require("../db/db")

describe("routes: user", function() {
	beforeEach(function(done) {
    db.migrate.rollback()
    .then(function() {
      db.migrate.latest()
      .then(function() {
        return db.seed.run().then(function() {
          done();
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
	describe("GET /api/user", () => {
		it("should register user", (done) => {
			chai.request(app).post("/api/user/register").send({
				first_name: "Jansen",
				last_name: "Yan",
				email: "jansen@jansen-test-company.com",
				password: "Fakepassword123!",
				confirm_password: "Fakepassword123!",
			}).end(async (err, res) => {
				res.status.should.equal(200)
				res.type.should.equal("application/json")
				const user = await db("users").where("email", "jansen@jansen-test-company.com").first()
				assert.isNotNull(user)
				done()
			})	
		})	
		it("should fail to register user due to validation errors", (done) => {
			// passwords not matching
			chai.request(app).post("/api/user/register").send({
				first_name: "Jansen",
				last_name: "Yan",
				email: "jansen@jansen-test-company.com",
				password: "Fakepassword123!",
				confirm_password: "notthesamepassword",
			}).end((err, res) => {
				res.status.should.equal(422)
				res.type.should.equal("application/json")
				const body = JSON.parse(res.text)
				assert.equal(body.errors.length, 1)
			})	
			// email not valid
			chai.request(app).post("/api/user/register").send({
				first_name: "Jansen",
				last_name: "Yan",
				email: "jansen",
				password: "Fakepassword123!",
				confirm_password: "Fakepassword123!",
			}).end((err, res) => {
				res.status.should.equal(422)
				res.type.should.equal("application/json")
				const body = JSON.parse(res.text)
				assert.equal(body.errors.length, 1)
			})	
			// email and password not valid
			chai.request(app).post("/api/user/register").send({
				first_name: "Jansen",
				last_name: "Yan",
				email: "jansen",
				password: "123abc",
				confirm_password: "123abc",
			}).end((err, res) => {
				res.status.should.equal(422)
				res.type.should.equal("application/json")
				const body = JSON.parse(res.text)
				assert.equal(body.errors.length, 2)
				done()
			})	
		})	
		it("should login user", async () => {
			// register a user first
			const res = await chai.request(app).post("/api/user/register").send({
				first_name: "Jansen",
				last_name: "Yan",
				email: "jansen@jansen-test-company.com",
				password: "Fakepassword123!",
				confirm_password: "Fakepassword123!",
			})
			res.status.should.equal(200)
			res.type.should.equal("application/json")
			let user = await db("users").where("email", "jansen@jansen-test-company.com").first()
			assert.isNotNull(user)

			user = await db("users").where("email", "jansen@jansen-test-company.com").first()
			const loginRes = await chai.request(app).post("/api/user/login").send({
				email: "jansen@jansen-test-company.com",
				password: "Fakepassword123!",
			})
			loginRes.status.should.equal(200)
			loginRes.type.should.equal("application/json")
			let body = JSON.parse(loginRes.text)
			assert.isNotNull(body.token)
		})	
	})
})


