const server = require('./existingExpressServer');
const app = require('./server-prod');

app.initialize({
  api: {
    server: {
      server,
    },
  },
});
