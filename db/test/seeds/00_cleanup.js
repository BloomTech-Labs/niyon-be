exports.seed = async function(knex) {
  await knex("user_tech").truncate();
  await knex("user").truncate();
  await knex("tech").truncate();
  await knex("location").truncate();
  await knex("job_title").truncate();
};