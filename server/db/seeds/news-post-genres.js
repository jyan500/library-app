/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('news_post_genres').del()
  await knex('news_post_genres').insert([
    {id: 1, name: 'Youth & Families'},
    {id: 2, name: 'Adult & Seniors'},
    {id: 3, name: 'Explore'},
  ]);
};
