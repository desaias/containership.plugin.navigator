const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('index', '/');
routes.add('applications', '/applications');
routes.add('hosts', '/hosts');
routes.add('hostsDetail', '/hosts/:id');

module.exports = routes;
