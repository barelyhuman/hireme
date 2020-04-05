const config = {
  length: 15,
  type: 'url-safe',
};

module.exports = () => cryptoRandomString(config);
