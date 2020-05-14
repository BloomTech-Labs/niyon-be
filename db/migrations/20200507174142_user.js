
exports.up = async function(knex) {
    await knex.schema.createTable('job_title', job_title =>{
        job_title.increments('id')
        job_title.string('job_title')
    })
    await knex.schema.createTable('location', location =>{
        location.increments('id')
        location.string('city')
        location.string('country')
    })
    await knex.schema.createTable('tech', tech =>{
        tech.increments('id')
        tech.string('name')
        tech.string('type')
    })
  await knex.schema.createTable('user', user =>{
     user.increments('id');
     user.string('first_name')
     user.string('last_name')
     user.text('bio')
     user.string('email', 50).notNullable().unique();
     user.string('password', 10).notNullable();
     user.string('user_type').defaultTo("MENTOR");
     user.integer('job_title_id')
         .references('id')
         .inTable('job_title')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
     user.integer('location_id')
         .references('id')
         .inTable('location')
         .onUpdate('CASCADE')
         .onDelete('CASCADE');
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
    await knex.schema.createTable('user_connections', table => {
        table.integer('userReq')
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.integer('userAcc')
            .references('id')
            .inTable('user')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('user_connections')
  await knex.schema.dropTableIfExists("user_tech")
  await knex.schema.dropTableIfExists("user")
  await knex.schema.dropTableIfExists("tech")
  await knex.schema.dropTableIfExists("location")
  await knex.schema.dropTableIfExists("job_title")
};
