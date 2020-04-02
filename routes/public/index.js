const glob = require('glob');

module.exports = (app) =>
  glob
    .sync('./routes/public/**/*.js', {
      cwd: `${__dirname}`,
      ignore: './routes/public/index.js',
    })
    // eslint-disable-next-line global-require
    .forEach((filename) => {
      require(`../../${filename}`)(app);
    });
