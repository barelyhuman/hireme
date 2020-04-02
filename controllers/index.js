const glob = require('glob');

module.exports = glob
  .sync('./controllers/**/*.js', {
    cwd: `${__dirname}/`,
    ignore: './controllers/index.js',
  })
  // eslint-disable-next-line global-require
  .map((filename) => require(`../${filename}`))
  .reduce((allControllers, controller) => {
    allControllers[controller.name] = controller;
    return allControllers;
  }, {});
