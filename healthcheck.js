const http = require('http');

const options = {
  host: 'localhost',
  port: '8088',
  path: '/api/v1/',
  timeout: 2000,
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => {
  process.exit(1);
});

request.end();
