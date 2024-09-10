/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 	return knex.schema.alterTable("user_borrow_history", (table) => {
 		table.dropColumn("transaction_num")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("user_borrow_history", (table) => {
		table.integer("transaction_num").unsigned().notNullable()
	}) 
};
