exports.up = function (knex) {
  return knex.schema

    .createTable('users', function (table) {
      table.uuid('id').unique().primary().notNullable();
      table.string('email').unique().notNullable();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
    })

    .createTable('listings', function (table) {
      // Table Fields
      table.uuid('id').unique().primary().notNullable();
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.string('tags').nullable();
      table.string('location').nullable();
      table.uuid('created_by').notNullable();

      // Foreign Keys
      table.foreign('created_by').references('users.id');
    })

    .createTable('applications', function (table) {
      // Table Fields
      table.uuid('id').unique().primary().notNullable();
      table.uuid('applied_by').notNullable();
      table.uuid('listing_id').notNullable();

      // Foreign Keys
      table.foreign('applied_by').references('users.id');
      table.foreign('listing_id').references('listings.id');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('applications')
    .dropTableIfExists('listings')
    .dropTableIfExists('users');
};
