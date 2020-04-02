// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'hireme',
      user: 'admin',
      password: 'root',
    },
    // pool: {
    //   min: 2,
    //   max: 10,
    // },
    migrations: {
      tableName: 'migrations',
    },
  },
};
