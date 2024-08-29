/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("user_books", (table) => {
		table.increments("id").primary()
		table.integer("library_book_id").unsigned().notNullable()
		table.integer("user_id").unsigned().notNullable()
		table.foreign("library_book_id").references("library_books.id").onDelete("cascade")
		table.foreign("user_id").references("users.id").onDelete("cascade")
		table.timestamp("date_borrowed").notNullable()
		table.timestamp("date_due").notNullable()
		table.timestamp("date_returned")
	 	table.timestamp('created_at').defaultTo(knex.fn.now());	
 		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists("user_books") 
};
