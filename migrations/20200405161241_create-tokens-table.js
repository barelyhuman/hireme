exports.up = function (knex) {
  return knex.schema
    .createTable('tokens', function (table) {
      table.increments('id').primary().unique().notNullable();
      table.string('token_name').notNullable();
      table.text('token').unique().notNullable();
      table.boolean('is_verified').defaultTo('false').notNullable();
      table.string('email').notNullable();
      table.timestamps(true, true);
    })
    .alterTable('users', function (table) {
      table.string('password').nullable().alter();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tokens')
    .alterTable('users', function (table) {
      table.string('password').notNullable().alter();
    });
};
