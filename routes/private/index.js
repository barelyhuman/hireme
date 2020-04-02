const glob = require('glob');

module.exports = (app) =>
  glob
    .sync('./routes/private/**/*.js', {
      cwd: `${__dirname}`,
      ignore: './routes/private/index.js',
    })
    // eslint-disable-next-line global-require
    .forEach((filename) => {
      require(`../../${filename}`)(app);
    });
