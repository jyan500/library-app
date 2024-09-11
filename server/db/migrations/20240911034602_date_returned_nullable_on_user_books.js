/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 	return knex.schema.alterTable("user_books", (table) => {
 		table.timestamp("date_returned").nullable().defaultTo(null).alter()
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("user_borrow_history", (table) => {
		table.timestamp("date_returned").alter()
	}) 
};
