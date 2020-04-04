const jwtGenerator = require('../utils/token-generator');
const passwordHasher = require('../utils/password-hash');
const { Response } = require('cottage');

const controller = {
  name: 'AuthController',
};

controller.register = async (ctx) => {
  const trx = await ctx.db.transaction();
  try {
    const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const payload = ctx.request.body || {};
    if (!payload.email || !payload.password) {
      return new Response(400, { error: `Email/Password is required` });
    }

    if (!passwordRegex.test(payload.password)) {
      return new Response(400, {
        error: `Password should contain at least 1 upper case letter,
        1 lower case letter,1 number or special character,8 characters in length`,
      });
    }

    const hashedPassword = await passwordHasher.hash(payload.password);

    const existingUser = await trx('users').where({
      email: payload.email,
    });

    if (existingUser && existingUser.length) {
      return new Response(400, { error: `User with email already exists` });
    }

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
    throw err;
  }
};

controller.login = async (ctx) => {
  try {
    const payload = ctx.request.body || {};
    if (!payload.email || !payload.password) {
      return new Response(400, { error: `Email/Password is required` });
    }

    const userDetails = await ctx.db('users').where({ email: payload.email });

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
