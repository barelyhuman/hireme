const controller = {
  name: 'ApplicationController',
};

controller.create = async (ctx) => {};

controller.get = async (ctx) => {
  const { currentUser } = ctx;
  const applications = await ctx
    .db('applications')
    .leftJoin('listings', 'listings.id', 'applications.listing_id')
    .where({
      applied_by: currentUser.id,
    });

  return {
    data: applications,
  };
};

controller.delete = async (ctx) => {};

controller.edit = async (ctx) => {};

module.exports = controller;
