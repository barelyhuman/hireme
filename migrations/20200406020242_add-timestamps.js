exports.up = function (knex) {
  return knex.schema

    .alterTable('listings', function (table) {
      table.timestamps(true, true);
    })

    .alterTable('applications', function (table) {
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema

    .table('listings', function (table) {
      table.dropTimestamps();
    })

    .table('applications', function (table) {
      table.dropTimestamps();
    });
};
