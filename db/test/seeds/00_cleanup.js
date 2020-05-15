exports.seed = async function(knex) {
  function pgTruncate(table){
      return knex.raw('TRUNCATE TABLE ?? START IDENTITY CASCADE',table)
  }
  return await knex("user_tech").truncate();
  await pgTruncate("user")
  await pgTruncate("tech")
  await pgTruncate("location")
  await pgTruncate("job_title")
};
