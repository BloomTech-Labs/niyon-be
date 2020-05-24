exports.seed = async function(knex) {
  await knex("user").insert([
    {
      first_name: "joe",
      last_name: "thompson",
      email: "joe1@gmail.com",
      password: "123",
      user_type: "Mentor",
      job_title_id: 3,
      location_id: 4,
      bio: 'This is my bio'
    },
    {
      first_name: "tawne",
      last_name: "thompson",
      email: "tawne1@gmail.com",
      password: "123",
      user_type: "Mentor",
      job_title_id: 12,
      location_id: 63

    }
  ]);
};
