const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require('./config/config.json');
const InitControllers = require('./app/InitControllers');
const logger = require('./services/logger');

const app = express();
const server = http.createServer(app);

require('./middlewares')(app);

app.use(bodyParser.json());

let resolveFunction;
const readyPromise = new Promise((resolve) => {
  resolveFunction = resolve;
});

const contr = new InitControllers();
contr.init(app);

server.listen(config.serverPort, () => {
  logger.info(`> Listening at http://localhost:${config.serverPort}\n`);
  resolveFunction();
});

module.exports = {
  app,
  ready: readyPromise,
  close: (done) => {
    server.close(done);
  },
};
