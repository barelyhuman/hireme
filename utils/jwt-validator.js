const jwt = require('jsonwebtoken');
const jwtSecret = require('../configs/jwt');

module.exports = async (ctx, next) => {
  try {
    const token = ctx.header['Authorization'] || ctx.header['authorization'];
    if (!token || !token.length) {
      ctx.status = 401;
      ctx.body = `Unauthorized!`;
      return ctx.throw(401, 'Unauthorized!');
    }

    const decoded = await jwt.verify(token, Buffer.from(jwtSecret, 'base64'));

    const currentUser = await ctx.db('users').where({
      id: decoded.id,
    });

    if (!currentUser || !currentUser.length) {
      ctx.throw(401, `Unauthorized`);
    }

    ctx.currentUser = currentUser;

    return next();
  } catch (err) {
    ctx.throw(401, `Unauthorized`);
  }
};
