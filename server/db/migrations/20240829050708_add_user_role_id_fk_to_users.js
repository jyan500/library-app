/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 	return knex.schema.alterTable("users", (table) => {
		table.integer("user_role_id").unsigned().notNullable()
		table.foreign("user_role_id").references("user_roles.id").onDelete("cascade")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("users", (table) => {
		table.dropForeign("user_role_id")
		table.dropColumn("user_role_id")
	}) 
};
