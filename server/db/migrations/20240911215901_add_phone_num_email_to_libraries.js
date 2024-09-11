/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.alterTable("libraries", (table) => {
		table.string("phone_num")
		table.string("email")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("libraries", (table) => {
		table.dropColumn("phone_num")
		table.dropColumn("email")
	})  
};
