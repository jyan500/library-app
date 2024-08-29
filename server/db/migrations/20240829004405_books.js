/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("books", (table) => {
		table.increments("id").primary()
		table.string("title").notNullable()
		table.string("image_url")
		table.string("author")
		table.integer("genre_id").unsigned().notNullable()
		table.foreign("genre_id").references("genres.id").onDelete("cascade")
	 	table.timestamp('created_at').defaultTo(knex.fn.now());	
 		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists("books") 
};
