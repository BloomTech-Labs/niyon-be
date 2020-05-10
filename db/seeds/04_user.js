exports.seed = async function(knex) {
    await knex("user").insert([
        {
            first_name: 'joe',
            last_name: 'thompson',
            email: 'joe@gmail.com',
            password: '123',
            user_type: 'MENTOR',
            job_title_id: 1,
            location_id: 1
        },
        {
            first_name: 'tawne',
            last_name: 'thompson',
            email: 'tawne@gmail.com',
            password: '123',
            user_type: 'MENTOR',
            job_title_id: 12,
            location_id: 63
        }
    ])
};
