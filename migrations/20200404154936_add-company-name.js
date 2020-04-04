exports.up = function (knex) {
  return knex.schema.alterTable('listings', function (table) {
    table.string('company_name');
  });
};

exports.down = function (knex) {
  return knex.schema.table('listings', function (table) {
    table.dropColumn('company_name');
  });
};
