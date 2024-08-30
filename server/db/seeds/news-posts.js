/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('news_posts').del()
  return await knex('news_posts').insert([
    {id: 1, title: "The Library Has Curbside Pickup!", image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031"},
    {id: 2, title: "Head Back to School With San Mateo County Libraries", image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751"},
    {id: 3, title: "Celebrate Asian American Pacific Islander Heritage Month", image_url: "https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009"},
    {id: 4, title: "Tips On Raising Your Little Grogu Into A Reader", image_url: "https://web.archive.org/web/20240430085128im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/grogu-banner-888x444.jpg?ver=240426211614"},
    {id: 5, title: "Together, We Can Take Of Our Mental Health", image_url: "https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/mentalhealth-banner2-888x444.jpg?ver=240502181558"},
    {id: 6, title: "Doug Sheehan Wins the 2024 Neal Poppin Award", image_url: "https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/doug-banner-888x444.png?ver=240515171102"},
    {id: 7, title: "Introducing Our First Library Outpost!", image_url: "https://web.archive.org/web/20240710205546im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/pacoutpost-banner-888x444.jpg?ver=240710194048"}
  ]);
};
