
exports.seed = async function(knex) {
  await knex("user_tech").insert([
      { user_id: 1, tech_id: 1 }
  ])
};
