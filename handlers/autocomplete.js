var _ = require("lodash");
var request = require("request");

module.exports = {

    initialize: function(){},

    get: function(req, res, next){
        var options = {
            url: "https://registry.hub.docker.com/autocomplete",
            qs: req.query,
            json: true
        }

        request(options, function(err, response){
            if(err){
                res.stash = {
                    code: 400
                }
            }
            else{
                var results = _.map(response.body, function(result){
                    return {
                        title: [result.namespace, result.name].join("/")
                    }
                });
                res.stash = {
                    code: response.statusCode,
                    body: {
                        results: results
                    }
                }
            }
            return next();
        });
    }

}
