const dbConfig = require('../knexfile');
const knex = require('knex');

module.exports = () => {
  const configByEnvironment = dbConfig[process.env.NODE_ENV || 'development'];

  const db = knex(configByEnvironment);

  return db;
};
