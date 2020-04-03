const jwtGenerator = require('../utils/token-generator');
const passwordHasher = require('../utils/password-hash');
const { Response } = require('cottage');

const controller = {
  name: 'AuthController',
};

controller.register = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const payload = ctx.request.body || {};
    if (!payload.email || !payload.password) {
      return new Response(400, { error: `Email/Password is required` });
    }
    const hashedPassword = await passwordHasher.hash(payload.password);

    await trx('users').insert({
      email: payload.email,
      password: hashedPassword,
    });

    await trx.commit();

    return {
      message: 'Profile Created',
    };
  } catch (err) {
    await trx.rollback();
    return new Response(err);
  }
};

controller.login = async (ctx) => {
  try {
    const payload = ctx.request.body || {};
    if (!payload.email || !payload.password) {
      return new Response(400, { error: `Email/Password is required` });
    }

    const userDetails = await ctx.db('users').where({ email: payload.email });

    console.log({ userDetails });

    if (!userDetails || !userDetails.length) {
      return new Response(400, { error: `Invalid Email/Password` });
    }

    if (!passwordHasher.compare(payload.password, userDetails[0].password)) {
      return new Response(400, { error: `Invalid Email/Password` });
    }

    const token = await jwtGenerator(userDetails[0]);
    return new Response(200, {
      data: {
        id: userDetails[0].id,
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(err.code, err.message);
  }
};

module.exports = controller;
