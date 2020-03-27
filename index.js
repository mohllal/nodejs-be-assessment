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

const controller = new InitControllers();
controller.init(app);

server.listen(config.serverPort, () => {
  logger.info(`> Listening at http://localhost:${config.serverPort}\n`);
});

module.exports = {
  app,
  close: (done) => {
    server.close(done);
  },
};
