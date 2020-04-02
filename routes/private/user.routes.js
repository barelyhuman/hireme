const { UserController } = require('../../controllers');

module.exports = (app) => {
  app.get('/user', UserController.fetchUser);
};
