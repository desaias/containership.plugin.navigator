const ContainershipPlugin = require('containership.plugin');
const next = require('next');
const routes = require('./routes');

module.exports = new ContainershipPlugin({
  type: 'core',
  name: 'navigator',

  initialize: (core) => {
    const app = next({ dev: false });
    const handler = routes.getRequestHandler(app);
    core.api.server.server.use(handler);
  },

  reload: () => {},
});
