const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const config = require('./config/config.json');
const InitControllers = require('./app/InitControllers');
const logger = require('./services/logger');

const app = express();
const server = http.createServer(app);

require('./middlewares')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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
