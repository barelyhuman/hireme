const { AuthController } = require('../../controllers');

module.exports = (app) => {
  app.post('/register', AuthController.register);

  app.post('/login', AuthController.login);

  app.post('/register/magic', AuthController.createMagicRequest);

  app.get('/verify/magic', AuthController.verifyMagicRequest);

  app.post('/confirm/magic', AuthController.acceptMagicRequest);
};
