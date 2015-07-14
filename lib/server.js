var _ = require("lodash");
var fs = require("fs");
var express = require("express");
var hbs = require("hbs");
var crypto = require("crypto");
var body_parser = require("body-parser");
var middleware = require([__dirname, "middleware"].join("/"));

function Server(core, config){
    this.config = config;
    this.server = express();

    this.server.use(body_parser.json());
    this.server.disable("x-powered-by");

    this.server.set("views", [__dirname, "..", "views"].join("/"));
    this.server.set("view engine", "hbs");
    hbs.registerPartials([__dirname, "..", "views", "partials"].join("/"));

    // set required pre-operation middleware
    this.server.use(middleware.init_response);
    this.server.use(middleware.json_request);

    if(_.has(this.config, "basic-auth")){
        var basic_auth = function(req, res, next){
            res.setHeader("WWW-Authenticate", "Basic");
            if(!_.has(req.headers, "authorization")){
                res.stash.code = 401;
                return middleware.handle_response(req, res, next);
            }

            var auth_header = req.headers.authorization;
            auth_header = auth_header.split(" ")[1];

            if(_.isUndefined(auth_header)){
                res.stash.code = 401;
                return middleware.handle_response(req, res, next);
            }
            else
                auth_header = new Buffer(auth_header, "base64").toString();

            var md5 = crypto.createHash("md5");
            md5.update(auth_header);

            if(_.contains(config["basic-auth"].split(" "), md5.digest("hex")))
                return next();
            else{
                res.stash.code = 401;
                return middleware.handle_response(req, res, next);
            }
        }

        this.server.use(basic_auth);
    }

    // register the routes
    var routes = require([__dirname, "..", "routes"].join("/"));
    routes.register(this.server, core);

    // static assets
    this.server.use(express.static([__dirname, "..", "static"].join("/")));

    // set required post-operation middleware
    this.server.use(middleware.handle_response);
}

Server.prototype.listen = function(){
    this.listener = this.server.listen(8081, "0.0.0.0");
}

Server.prototype.exit = function(){
    this.listener.close();
}

module.exports = Server;
