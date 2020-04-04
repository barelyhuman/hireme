const { UserController } = require('../../controllers');

module.exports = (app) => {
  app.post('/register', UserController.register);

  app.post('/login', UserController.login);
};
