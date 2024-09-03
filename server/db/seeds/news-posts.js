/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('news_posts').del()
  return await knex('news_posts').insert([
    {
      title: "The Library Has Curbside Pickup!", 
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2021/07/CURBSIDE-BLOG--888x444.png?ver=210729234031",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Head Back to School With San Mateo County Libraries", 
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-res-banner-888x444.jpg?ver=240806225751",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Celebrate Asian American Pacific Islander Heritage Month", 
      image_url: "https://web.archive.org/web/20240502022214im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/03/aapi-banner-888x444.jpg?ver=240417171009",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Tips On Raising Your Little Grogu Into A Reader", 
      image_url: "https://web.archive.org/web/20240430085128im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/grogu-banner-888x444.jpg?ver=240426211614",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Together, We Can Take Of Our Mental Health", 
      image_url: "https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/mentalhealth-banner2-888x444.jpg?ver=240502181558",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Doug Sheehan Wins the 2024 Neal Poppin Award", 
      image_url: "https://web.archive.org/web/20240516085408im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/doug-banner-888x444.png?ver=240515171102",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Introducing Our First Library Outpost!", 
      image_url: "https://web.archive.org/web/20240710205546im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/pacoutpost-banner-888x444.jpg?ver=240710194048",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Children's Stories about Library Magic",
      image_url: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/2603760019.png?dummy=4060",
      news_post_genre_id: 1,
      description: "These stories feature libraries of all shapes and sizes, and some interesting library patrons. Read on to experience some library magic!"
    },
    {
      title: "Back to School Resources at the Library",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/b2school-square-444x444.jpg?ver=240827200908",
      news_post_genre_id: 1,
      description: "San Mateo County Libraries has resources for students, parents and teachers to help you have a successful school year!"
    },
    {
      title: "California Department of Education's Picture Book Recs",
      image_url: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/2597434749.png?dummy=9589",
      news_post_genre_id: 1,
      description: "CDE’s book lists include an especially stellar lineup of picture books. View a few of the recommended titles we have in our libraries."
    },
    {
      title: "My Summer as an Outreach Intern at Pacifica Library",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/07/msmrintern-banner-444x444.jpg?ver=240801163830",
      news_post_genre_id: 1,
      description: "Take a peek into Hannah's experience working as an intern this summer at the Pacifica libraries!"
    },
    {
      title: "YA Recommendations Full of Summertime Fun",
      image_url: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/2568742538.png?dummy=6027",
      news_post_genre_id: 1,
      description: "Summer's not over yet! Lounge outside on your favorite chair or inside the library with one of these cool summer reads."
    },
    {
      title: "Learn about Ants with Christopher the Ant Keeper",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/07/woodside-ants-square-444x444.jpg?ver=240729163317",
      news_post_genre_id: 1,
      description: "San Carlos and Woodside libraries are home to native ant displays! Learn more about them in this interview with Christopher the Ant Keeper."
    },
    {
      title: "How to Start a Kid-Parent Book Club",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/06/kidparentbook-banner-444x444.jpg?ver=240625171844",
      news_post_genre_id: 1,
      description: "Encourage your child to read and make memories by starting a Kid-Parent Book Club!"
    },
    {
      title: "Donate Your Used Books to the Friends of the Library",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/05/fot-banner-444x444.jpg?ver=240529000410",
      news_post_genre_id: 1,
      description: "If you are looking for a new home for the books you no longer need, please consider donating them to your local Friends of the Library!"
    },
    {
      title: "Virgo Season: Time for Mysteries and Mayhem",
      image_url: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/2606753299.png?dummy=6105",
      news_post_genre_id: 2,
      description: "Mysteries are the perfect genre for Virgo season, so if you enjoy a good whodunnit, check out these scintillating titles!"
    },
    {
      title: "Crochet the Day Away",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/crochet-banner-444x444.jpg?ver=240826172612",
      news_post_genre_id: 2,
      description: "Whether you're a beginner or advanced crocheter, San Mateo County Libraries has resources to help you crochet the day away.",
    },
    {
      title: "Pirate Treasures: Swashbuckling Adventures for Adults",
      image_url: "https://cor-cdn-static.bibliocommons.com/list_jacket_covers/live/2603773283.png?dummy=6488",
      news_post_genre_id: 2,
      description: "Embark on a voyage with our collection of pirate-themed books, DVDs and more. Set sail with us and discover the allure of pirate lore!",
    },
    {
      title: "Learn Filipino History and Languages at the Library",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/07/filip-banner-444x444.jpg?ver=240729183126",
      news_post_genre_id: 2,
      description: "August is Filipino Language Month, making it the perfect time to learn more about Filipino languages and culture at the library."
    },
    {
      title: "Create Custom 3D Prints to Meet Your Household Needs", 
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/07/3DPRINTER-BANNER-888x444.jpg?ver=240709174527",
      news_post_genre_id: 2, 
      description: "Discover how to create functional 3D printed objects at your local library!"
    },
    {
      title: "That's My Bestie: Friendship Goals in Books and Movies",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/07/friendshipday-banner2-888x444.jpg?ver=240716191025",
      news_post_genre_id: 2,
      description: "Celebrate International Day of Friendship with San Mateo County Libraries' books and movies about inspiring friendships."
    }
    {
      title: "Celebrating National Library Card Sign-Up Month",
      image_url: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/08/Libraries-are-Magic-01-1780x890.png?ver=240827190455",
      news_post_genre_id: 3,
      description: ""
    },
    {
      title: "Meet Sasha Vasilyuk, Author of Your Presence is Mandatory",
      image_url: "https://web.archive.org/web/20240523032953im_/https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/22/2024/04/Sasha-banner-888x444.jpg?ver=240428231004",
      news_post_genre_id: 3,
      description: ""
    }
  ]);
};
