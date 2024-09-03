/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 	return knex.schema.alterTable("news_posts", (table) => {
		table.integer("news_post_genre_id").unsigned().notNullable()
		table.foreign("news_post_genre_id").references("news_post_genres.id").onDelete("cascade")
		table.text("description")
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.alterTable("news_posts", (table) => {
		table.dropForeign("news_post_genre_id")
		table.dropColumn("news_post_genre_id")
		table.dropColumn("description")
	}) 
};
