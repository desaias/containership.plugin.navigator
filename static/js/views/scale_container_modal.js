Containership.Views.ScaleContainerModal = Backbone.View.extend({

    tagName: "div",

    id: "scaleContainerModal",

    className: "ui small modal",

    events: {},

    initialize: function(){},

    render: function(){
        var self = this;
        this.get_num_containers(function(num_containers){
            if(!_.isUndefined(num_containers)){
                var content = [
                    '<i class = "close icon"></i>',
                    '<div class = "header">', 'Scale ', self.model.get("id"), '</div>',
                    '<div class = "content">',
                        '<div class="ui form grid">',
                            '<div class = "two column row">',
                                '<div class = "four wide column">',
                                    '<label class = "createLabel">Instances:</label>',
                                '</div>',
                                '<div class = "twelve wide column fluid">',
                                    '<input id = "instances" type="text" value = "', num_containers, '">',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class = "actions">',
                        '<div class="ui red button">Cancel</div>',
                        '<div class="ui ok green button">Update</div>',
                    '</div>'
                ]

                $(self.el).html(content.join(""));
                $(self.el).modal({
                    onHidden: function(){
                        self.remove();
                    },
                    onApprove: function(){
                        self.get_num_containers(function(num_containers){
                            self.scale_application($("#instances").val() - num_containers);
                        });
                    }
                }).modal("show");
                $("#main").append(self.el);
            }
        });
    },

    get_num_containers: function(fn){
        $.ajax({
            url: ["http://", window.location.hostname, ":8080/v1/applications/", this.model.get("id"), "/containers"].join(""),
            contentType: "application/json",
            success: function(containers){
                return fn(containers.length);
            },
            error: function(){
                return fn();
            }
        });
    },

    scale_application: function(instances){
        var qs = ["count", Math.abs(instances)].join("=");
        $.ajax({
            type: instances > 0 ? "POST" : "DELETE",
            url: [["http://", window.location.hostname, ":8080/v1/applications/", this.model.get("id"), "/containers"].join(""), qs].join("?"),
            contentType: "application/json",
            success: function(){
            },
            error: function(){
            }
        });
    }

});
