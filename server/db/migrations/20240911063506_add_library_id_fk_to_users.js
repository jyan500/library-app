/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.alterTable("users", (table) => {
		table.integer("library_id").unsigned().nullable().defaultTo(null)
		table.foreign("library_id").references("libraries.id").onDelete("cascade")
	}) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("users", (table) => {
		table.dropForeign("library_id")
		table.dropColumn("library_id")
	})
};
