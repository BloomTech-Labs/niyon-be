/*
    this table has been migrated to the production db
    no routes or models have been created
*/
exports.up = async function(knex) {
  await knex.schema.createTable('question', table => {
      table.increments('id');
      table.string('title').notNullable();
      table.integer('tech_id')
          .references('id')
          .inTable('tech')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      table.text('description').notNullable();
      table.text('tried').notNullable()
      table.integer('user_id')
           .references('id')
           .inTable('user')
           .onUpdate('CASCADE')
           .onDelete('CASCADE');
      // thinking we could set the seed data to have the first value be "open" or "unanswered"
      // once we get a few comments on the question we can let the user pick the answer and update the value
      table.integer('answer').defaultTo(null)
  });
    await knex.schema.createTable('comment', table => {
       table.increments('id');
       table.text('answer').notNullable();
       table.integer('question_id')
           .references('id')
           .inTable('question')
           .onUpdate('CASCADE')
           .onDelete('CASCADE');
       table.integer('user_id')
           .references('id')
           .inTable('user')
           .onUpdate('CASCADE')
           .onDelete('CASCADE');
    });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('comment');
  await knex.schema.dropTableIfExists('question')
};
