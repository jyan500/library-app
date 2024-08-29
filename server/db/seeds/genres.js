/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('genres').del()
    return await knex('genres').insert([
        {id: 1, name: "Medical Books"},
        {id: 2, name: "Test Preparation"},
        {id: 3, name: "Biographies & Memoirs"},
        {id: 4, name: "Religion & Spirituality"},
        {id: 5, name: "Arts & Photography"},
        {id: 6, name: "Literature & Fiction"},
        {id: 7, name: "Engineering & Transportation"},
        {id: 8, name: "Science & Math"},
        {id: 9, name: "Christian Books & Bibles"},
        {id: 10, name: "Children's Books"},
        {id: 11, name: "Self-Help"},
        {id: 12, name: "Law"},
        {id: 13, name: "Politics & Social Sciences"},
        {id: 14, name: "Health, Fitness & Dieting"},
        {id: 15, name: "Business & Money"},
        {id: 16, name: "Parenting & Relationships"},
        {id: 17, name: "Sports & Outdoors"},
        {id: 18, name: "Computers & Technology"},
        {id: 19, name: "Cookbooks, Food & Wine"},
        {id: 20, name: "Crafts, Hobbies & Home"},
        {id: 21, name: "Travel"},
        {id: 22, name: "Humor & Entertainment"},
        {id: 23, name: "Reference"},
        {id: 24, name: "Calendars"},
        {id: 25, name: "History"},
        {id: 26, name: "Comics & Graphic Novels"},
        {id: 27, name: "Teen & Young Adult"},
        {id: 28, name: "Romance"},
        {id: 29, name: "Science Fiction & Fantasy"},
        {id: 30, "Mystery, Thriller & Suspense"}
    ]);
};
