var _ = require("lodash");
var npm = require("npm");

var plugins_dir = [process.env["HOME"], ".containership", "plugins"].join("/");

module.exports = {

    initialize: function(){},

    get: function(req, res, next){
        npm.load({prefix: plugins_dir}, function(){
            npm.commands.ls([], {json: true}, function(err, data){
                if(err){
                    res.stash = {
                        code: 500,
                        body: {
                            error: err.message
                        }
                    }
                }
                else{
                    var dependencies = _.map(data.dependencies, function(dependency, name){
                        return {
                            name: dependency.name,
                            version: dependency.version
                        }
                    });
                    res.stash = {
                        code: 200,
                        body: dependencies
                    }
                }

                return next();
            });
        });
    }

}
