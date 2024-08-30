/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('book_statuses').del()
  return await knex('book_statuses').insert([
    {id: 1, name: 'Available'},
    {id: 2, name: 'Borrowed'},
    {id: 3, name: 'On Hold'},
  ]);
};
