const { Response } = require('cottage');

const controller = {
  name: 'ListingController',
};

controller.create = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const payload = ctx.request.body;

    if (!payload.name || !payload.description) {
      return new Response(400, `Missing fields`);
    }

    payload.created_by = ctx.currentUser.id;

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
  const listings = await ctx.db('listings');

  const alreadyAppliedListings = (
    await ctx
      .db('applications')
      .where({
        applied_by: ctx.currentUser.id,
      })
      .select('listing_id as id')
  ).map((item) => item.id);
  const listingsWithAppliedStatus = listings.map((listing) => {
    listing.applied = alreadyAppliedListings.indexOf(listing.id) > -1;
    return listing;
  });

  return {
    data: listingsWithAppliedStatus,
  };
};

controller.getByOwner = async (ctx) => {
  const listings = await ctx.db('listings').where({
    created_by: ctx.currentUser.id,
  });

  return {
    data: listings,
  };
};

controller.getById = async (ctx) => {
  const listings = await ctx
    .db('listings')
    .leftJoin('applications', 'applications.listing_id', 'listings.id')
    .where({
      'listings.id': id,
    });

  const groupedByListingId = listings.reduce((acc, listing) => {
    (acc[listing.id] || (acc[listing.id] = [])).push(listing);
    return acc;
  }, {});

  return {
    data: groupedByListingId,
  };
};

controller.delete = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const { currentUser } = ctx;
    const payload = ctx.request.params;
    const listings = await trx('listings')
      .where({
        'listings.id': payload.id,
        created_by: currentUser.id,
      })
      .leftJoin('applications', 'applications.listing_id', 'listings.id')
      .select('listings.id as listingId', 'applications.id as applicationId');

    if (!listings || !listings.length) {
      return new Response(404, `Couldn't find the listing`);
    }

    await trx('applications')
      .whereIn(
        'id',
        listings.map((item) => item.applicationId)
      )
      .del();

    await trx('listings')
      .where({
        id: payload.id,
        created_by: currentUser.id,
      })
      .del();

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
