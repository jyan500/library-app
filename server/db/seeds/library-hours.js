/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex("library_hours").del()
    const libraries = await knex('libraries')
    let hours = []
    libraries.forEach((library) => {
        let dayHours = [] 
        if (library.name === "Pacifica Sanchez"){
            dayHours = [...dayHours, 
                {
                    day: 3,
                    library_id: library.id,
                    start_hour: "12:00:00",
                    end_hour: "17:00:00",
                },
                {
                    day: 4,
                    library_id: library.id,
                    start_hour: "12:00:00",
                    end_hour: "17:00:00",
                },
                {
                    day: 7,
                    library_id: library.id,
                    start_hour: "11:00:00",
                    end_hour: "17:00:00",
                }
            ]
        }
        else if (library.name === "Mitchell Park"){
            Array.from(Array(7), (_, i) => {
                dayHours.push({
                    day: i+1,
                    library_id: library.id,
                    start_hour: "10:00:00",
                    end_hour: (i === 1 || i >= 6 ? "18:00:00" : "21:00:00"),
                })
            })
        }
        else {

            Array.from(Array(7), (_, i) => {
                dayHours.push({
                    day: i+1,
                    library_id: library.id,
                    start_hour: "10:00:00",
                    end_hour: (i >= 4 ? "17:00:00" : "20:00:00"),
                })
            })
        }
        hours = [...hours, ...dayHours]
    })
    return await knex('library_hours').insert(hours);
};
