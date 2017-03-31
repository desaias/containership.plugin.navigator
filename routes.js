const nextRoutes = require('next-routes');

const routes = nextRoutes();

routes.add('overview', '/', 'index');
routes.add('applications', '/applications');
routes.add('applicationsDetail', '/applications/:id');
routes.add('applicationConstraints', '/applications/:id/constraints');
routes.add('applicationContainers', '/applications/:id/containers');
routes.add('applicationEnvVars', '/applications/:id/variables');
routes.add('applicationSettings', '/applications/:id/settings');
routes.add('applicationVolumes', '/applications/:id/volumes');
routes.add('applicationTags', '/applications/:id/tags');
routes.add('addApplication', '/add/application');
routes.add('hosts', '/hosts');
routes.add('hostsDetail', '/hosts/:id');
routes.add('hostContainers', '/hosts/:id/containers');
routes.add('hostSettings', '/hosts/:id/settings');
routes.add('hostTags', '/hosts/:id/tags');

module.exports = routes;
