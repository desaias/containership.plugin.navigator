var fs = require("fs");
var _ = require("lodash");
var middleware = require([__dirname, "lib", "middleware"].join("/"));

// register handlers
exports.register = function(server, options){
    var handlers = {};
    var available_handlers = fs.readdirSync([__dirname, "handlers"].join("/"));
    _.each(available_handlers, function(handler){
        var handler_name = handler.split(".")[0];
        handlers[handler_name] = require([__dirname, "handlers", handler].join("/"));
        handlers[handler_name].initialize(options);
    });

    // web ui
    server.get("/", handlers.ui.show);

    // autocomplete
    server.get("/autocomplete", handlers.autocomplete.get);

    // get plugins
    server.get("/plugins", handlers.plugins.get);
}
