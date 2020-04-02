/*
  Use the below code to generate a secret and set the generated value
  as an environment variable
  `require('crypto').randomBytes(256).toString('base64');`
*/

const secret = process.env.JWT_SECRET;

module.exports = secret;
