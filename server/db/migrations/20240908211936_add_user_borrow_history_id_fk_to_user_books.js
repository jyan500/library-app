/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 	return knex.schema.alterTable("user_books", (table) => {
		table.integer("user_borrow_history_id").unsigned().notNullable()
		table.foreign("user_borrow_history_id").references("user_borrow_history.id").onDelete("cascade")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("news_posts", (table) => {
		table.dropForeign("user_borrow_history_id")
		table.dropColumn("user_borrow_history_id")
	}) 
};
