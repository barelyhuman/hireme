const jwt = require('jsonwebtoken');
const jwtSecret = require('../configs/jwt');

module.exports = () => {
  return (ctx, next) => {
    try {
      const token = ctx.header['Authorization'] || ctx.header['authorization'];
      if (!token || !token.length) {
        ctx.status = 401;
        ctx.body = `Unauthorized!`;
        return ctx.throw(401, 'Unauthorized!');
      }

      jwt.verify(token, Buffer.from(jwtSecret, 'base64'), function (
        err,
        decoded
      ) {
        if (err) {
          ctx.throw(500, `Internal Server Error`);
          next(err);
          return;
        }

        ctx.currentUser = decoded;

        next();
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
};
