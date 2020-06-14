exports.seed = async function(knex) {
  await knex("user").insert([
    {
      first_name: "bobby",
      last_name: "hill",
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

    },
      {
      first_name: "Billy",
      last_name: "thompson",
      email: "billy@gmail.com",
      password: "123",
      user_type: "Mentor",
      job_title_id: 12,
      location_id: 63

    }
  ]);
};
