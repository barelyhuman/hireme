const controller = {
  name: 'ListingController',
};

controller.create = async (ctx) => {};

controller.get = async (ctx) => {
  const { currentUser } = ctx;
  const listings = await ctx.db('listings').where({
    created_by: currentUser.id,
  });

  return {
    data: listings,
  };
};

controller.delete = async (ctx) => {};

controller.edit = async (ctx) => {};

module.exports = controller;
