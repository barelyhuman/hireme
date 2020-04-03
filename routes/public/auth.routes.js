const { AuthController } = require('../../controllers');

module.exports = (app) => {
  app.post('/register', AuthController.register);

  app.post('/login', AuthController.login);
};
