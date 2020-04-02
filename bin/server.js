const { Cottage, Response } = require('cottage');
const app = new Cottage();

const PORT = process.env.PORT || 3000;

const logger = require('../utils/logger');
const jwtValidator = require('../utils/jwt-validator');
const db = require('../utils/db-injector')();

app.use(logger);

app.use((ctx, next) => {
  ctx.db = db;
  next();
});

// Public Routes
app.get('/ping', async (ctx) => {
  return new Response(200, `pong`);
});

/* 
  Routes that require the JWT to work 
  Can be added after the jwtValidator Insertion
*/
app.use(jwtValidator());
app.get('/pong', async (ctx) => {
  return new Response(200, `pong`);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
