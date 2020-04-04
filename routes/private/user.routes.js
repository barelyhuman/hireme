const {
  UserController,
  ListingController,
  ApplicationController,
} = require('../../controllers');

module.exports = (app) => {
  app.get('/user', UserController.fetchUser);
  app.get('/user/listings', ListingController.getByOwner);
  app.get('/user/applications', ApplicationController.getByApplier);
};
