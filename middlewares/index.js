const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const responseTime = require('response-time');
const geo = require('../services/geo.js');

module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(responseTime());

  morgan.token('real-remote-addr', (req) => geo.getIp(req));

  if (process.env.NODE_ENV !== 'testing') {
    app.use(
      morgan(
        ':real-remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":referrer" ":user-agent"',
        {
          skip(req) {
            // Ignore healthcheck so it doesn't flood logger
            return req.originalUrl === '/';
          },
        },
      ),
    );
  }
};
