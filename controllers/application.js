const { Response } = require('cottage');
const controller = {
  name: 'ApplicationController',
};

controller.create = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const { currentUser } = ctx;
    const payload = ctx.request.body;

    if (!payload.listing_id) {
      return ctx.throw(400, `No listing selected`);
    }

    const alreadyApplied = await trx('applications').where({
      listing_id: payload.listing_id,
      applied_by: currentUser.id,
    });

    if (alreadyApplied && alreadyApplied.length) {
      return new Response(400, { error: `Already Applied` });
    }

    payload.applied_by = currentUser.id;
    await trx('applications').insert(payload);
    await trx.commit();

    return {
      message: 'Applied to Listing',
    };
  } catch (err) {
    await trx.rollback();
    console.error(err);
    throw err;
  }
};

controller.getByApplier = async (ctx) => {
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
