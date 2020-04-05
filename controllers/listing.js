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
  const listings = await ctx.db('listings').whereNot({
    created_by: ctx.currentUser.id,
  });

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

controller.getApplicants = async (ctx) => {
  const applicants = await ctx
    .db('listings')
    .leftJoin('applications', 'applications.listing_id', 'listings.id')
    .leftJoin('users', 'applications.applied_by', 'users.id')
    .where({
      'listings.id': ctx.request.params.id,
    })
    .select(
      'applications.is_shortlisted as is_shortlisted',
      'users.email as userEmail',
      'users.id as userId',
      'listings.id as listingId',
      'listings.name as listingName',
      'applications.id as applicationId',
      'applications.created_at'
    )
    .orderBy(['created_at', 'applicationId']);

  const filtered = applicants.filter((item) => item.userEmail);

  return {
    data: filtered,
  };
};

controller.toggleShortlist = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const listingId = ctx.request.params.id;
    const applicantId = ctx.request.params.applicantid;
    const applicants = await trx('listings')
      .leftJoin(
        'applications as applicant',
        'applicant.listing_id',
        'listings.id'
      )
      .where({
        'listings.id': listingId,
        'applicant.applied_by': applicantId,
      });

    const toggleTo = !applicants[0].is_shortlisted;

    await trx('applications')
      .where({
        listing_id: listingId,
        applied_by: applicantId,
      })
      .update('is_shortlisted', toggleTo);

    await trx.commit();

    return {
      message: 'Updated Shortlist Status',
    };
  } catch (err) {
    await trx.rollback();
    console.error(err);
    throw err;
  }
};

controller.edit = async (ctx) => {};

module.exports = controller;
