/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("library_books", (table) => {
		table.increments("id").primary()
		table.integer("book_id").unsigned().notNullable()
		table.integer("library_id").unsigned().notNullable()
		table.integer("book_status_id").unsigned().notNullable()
		table.foreign("book_id").references("books.id").onDelete("cascade")
		table.foreign("library_id").references("libraries.id").onDelete("cascade")
		table.foreign("book_status_id").references("book_statuses.id").onDelete("cascade")
	 	table.timestamp('created_at').defaultTo(knex.fn.now());	
 		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists("library_books") 
};
