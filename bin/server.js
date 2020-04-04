const { Cottage, Response } = require('cottage');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const PORT = process.env.PORT || 3000;

// Custom Utils for Koa
// if the require path didn't ring a bell
const logger = require('../utils/logger');
const jwtValidator = require('../utils/jwt-validator');
const db = require('../utils/db-injector')();

// If the names weren't obvious...
// We importing injectors for routes
const injectPrivateRoutes = require('../routes/private');
const injectPublicRoutes = require('../routes/public');

// Nope, not using the instance from Koa
// Cottage on the other hand is for routing so I'm using it!
// Deal with it!
const app = new Cottage();

// Inject minimal logger
app.use(logger);

// Inject Cors
app.use(
  cors({
    origin: (ctx) => {
      const origin = ctx.headers.origin;
      const validOrigins = ['http://localhost:8080', '*.barelyhuman.dev'];
      if (validOrigins.indexOf(origin) !== -1) {
        return origin;
      }
      return false;
    },
  })
);

// Parse requests
app.use(bodyParser());

// Inject db instance into the ctx

app.use(async (ctx, next) => {
  try {
    ctx.db = db;
    await next();
  } catch (err) {
    console.error(err);
    if (typeof err.code == 'number') {
      ctx.throw(err.code, err.message);
    } else if (err.statusCode) {
      ctx.throw(err.statusCode, err.message);
    } else {
      ctx.throw(
        500,
        JSON.stringify({
          message: 'Oops! Something went wrong',
        }),
        { expose: true }
      );
    }
  }
});

// Public Routes
app.get('/ping', async (ctx) => {
  return new Response(200, `pong`);
});

injectPublicRoutes(app);

/* 
  Routes that require the JWT to work 
  Can be added after the jwtValidator Insertion
*/

app.use(jwtValidator);

injectPrivateRoutes(app);

process.on('unhandledRejection', (err) => {
  console.error(err);
  throw err;
});

// Run the engines!
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
