const controller = {
  name: 'ListingController',
};

controller.create = async (ctx) => {
  const trx = ctx.db.transaction();
  try {
    const payload = ctx.request.body;

    if (
      !payload.name ||
      !payload.description ||
      !payload.tags ||
      !payload.location ||
      !payload.created_by
    ) {
      return new Response(400, `Missing fields`);
    }

    await trx('listings').insert(payload);
    await trx.commit();

    return {
      message: 'Added Listing',
    };
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

controller.get = async (ctx) => {
  const { currentUser } = ctx;
  const listings = await ctx.db('listings').where({
    created_by: currentUser.id,
  });

  return {
    data: listings,
  };
};

controller.delete = async (ctx) => {
  const trx = ctx.db.transaction();
  try {
    const { currentUser } = ctx;
    const payload = ctx.request.params;

    const listings = await trx('listings').where({
      id: payload.id,
      created_by: currentUser.id,
    });

    if (!listings || !listings.length) {
      return new Response(404, `Couldn't find the listing`);
    }

    await trx('listings').where({
      id: payload.id,
      created_by: currentUser.id,
    });

    await trx.commit();

    return {
      message: 'Deleted Listing',
    };
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

controller.edit = async (ctx) => {};

module.exports = controller;
