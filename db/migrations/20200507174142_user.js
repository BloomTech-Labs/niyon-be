
exports.up = async function(knex) {
  await knex.schema.createTable('user', user =>{
     user.increments('id');
     user.string('first_name')
     user.string('last_name')
     user.string('email', 50).notNullable().unique();
     user.string('password', 10).notNullable();
     user.string('user_type').defaultTo("MENTOR")
     
     
     })
   await knex.schema.createTable('job_title', job_title =>{
      job_title.increments('id')
      job_title.string('job_title')
      job_title.integer('user_job_id')
      .references('id').inTable('user').onDelete('CASCADE').onUpdate('CASCADE')
   })

   await knex.schema.createTable('location', location =>{
      location.increments('id')
      location.string('location')
      location.integer('user_location_id')

   })

   await knex.schema.createTable('tech', tech =>{
      tech.increments('id')
      tech.string('name')
   })
   await knex.schema.createTable('user_tech', user_tech =>{
      user_tech.integer('user_id')
      .references('id')
      .inTable('user')
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      user_tech.integer('tech_id')
      .references('id')
      .inTable('tech')
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      user_tech.primary(['tech_id','user_id'])
      })

};

exports.down = async function(knex) {
  await knex.dropTableIfExists("user_tech")
  await knex.dropTableIfExists("tech")
  await knex.dropTableIfExists("location")
  await knex.dropTableIfExists("job_title")
  await knex.dropTableIfExists("user")
};
