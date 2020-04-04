const { ApplicationController } = require('../../controllers');

module.exports = (app) => {
  app.post('/applications', ApplicationController.create);
  app.delete('/applications/:id', ApplicationController.delete);
  app.post('/applications/:id', ApplicationController.edit);
};
