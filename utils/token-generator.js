const jwt = require('jsonwebtoken');
const jwtSecret = require('../configs/jwt');

module.exports = (userDetails) => {
  const payload = {
    id: userDetails.id,
  };

  return new Promise(function (resolve, reject) {
    jwt.sign(payload, Buffer.from(jwtSecret, 'base64'), function (err, token) {
      if (err) reject(err);
      return resolve(token);
    });
  });
};
