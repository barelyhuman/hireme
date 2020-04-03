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
    if (err) {
      ctx.throw(500, `Internal Server Error`);
      next(err);
      return;
    }

    ctx.currentUser = decoded;

    return next();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
