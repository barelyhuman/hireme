const { AuthController } = require('../../controllers');

module.exports = (app) => {
  app.post('/register', AuthController.register);

  app.post('/login', AuthController.login);

  app.post('/register/magic', AuthController.createMagicRequest);

  app.post('/verify/magic', AuthController.verifyMagicRequest);

  app.get('/confirm/magic', AuthController.acceptMagicRequest);
};
