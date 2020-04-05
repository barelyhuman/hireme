const urls = {
  development: 'http://localhost:8080',
  staging: 'https://hireme.barelyhuman.dev/',
};

module.exports = urls[process.env.NODE_ENV || 'development'];
