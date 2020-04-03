const { ListingController } = require('../../controllers');

module.exports = (app) => {
  app.post('/listings', ListingController.create);
  app.delete('/listings/:id', ListingController.delete);
  app.post('/listings/:id', ListingController.edit);
  app.get('/listings', ListingController.get);
};
