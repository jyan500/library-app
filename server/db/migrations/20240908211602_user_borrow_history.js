/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
		return knex.schema.createTable("user_borrow_history", (table) => {
		table.increments("id").primary()
		table.integer("transaction_num").unique().notNullable()
		table.integer("user_id").unsigned().notNullable()
		table.foreign("user_id").references("users.id").onDelete("cascade")
	 	table.timestamp('created_at').defaultTo(knex.fn.now());	
 		table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists("user_borrow_history") 
};
