/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("library_hours", (table) => {
		table.increments("id").primary()
		table.integer("library_id").unsigned().notNullable()
		table.foreign("library_id").references("libraries.id").onDelete("cascade")
		table.integer("day").unsigned().notNullable()
		table.time("start_hour").notNullable()
		table.time("end_hour").notNullable()
	 	table.timestamp('created_at').defaultTo(knex.fn.now());	
 		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists("library_hours") 
};
