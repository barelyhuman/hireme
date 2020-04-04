exports.up = function (knex) {
  return knex.schema.alterTable('applications', function (table) {
    table.boolean('is_shortlisted').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table('applications', function (table) {
    table.dropColumn('is_shortlisted');
  });
};
