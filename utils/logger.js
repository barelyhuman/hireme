const chalk = require('chalk');

module.exports = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  const rt = ctx.response.get('X-Response-Time');
  console.log(
    `${chalk.green(ctx.method)} ${chalk.green(ctx.url)} - ${chalk.blue(rt)}`
  );
};
