/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> } 
*/
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('library_books').del()
    const books = await knex("books")
    const libraries = await knex("libraries")
    const bookStatus = await knex("book_statuses").where("name", "Available").first()
    if (books.length && libraries.length && bookStatus){
        const result = []
        libraries.forEach((library) => {
            books.forEach((book) => {
                result.push({
                    library_id: library.id,
                    book_id: book.id,
                    book_status_id: bookStatus.id,
                })
            })
        })
        await knex("library_books").insert(result)
    }

};
