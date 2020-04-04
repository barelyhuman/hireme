const controller = {
  name: 'UserController',
};

controller.fetchUser = async (ctx) => {
  try {
    const { currentUser } = ctx;

    const data = await ctx
      .db('users')
      .leftJoin('profiles as profile', 'users.id', 'profile.user_id')
      .where('users.id', currentUser.id)
      .select(
        'profile.name as profileName',
        'profile.contact as profileContact',
        'profile.id as profileId',
        'users.id ',
        'users.email'
      );
    return {
      data: data[0],
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = controller;
