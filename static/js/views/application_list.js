Containership.Views.ApplicationList = Backbone.View.extend({

    tagName: "tr",

    events: {
        "click .application_details": "application_details",
        "click .scale-application": "scale_application",
        "click .delete-application": "delete_application"
    },

    initialize: function(){
        $(this.el).css("cursor", "pointer");
    },

    render: function(){
        var containers = this.model.get("containers");
        var loaded_containers = _.filter(containers, function(container){
            return container.status == "loaded";
        });

        var content = [
            '<td class = "application_details">', this.model.get("id"), '</td>',
            '<td class = "application_details">', this.model.get("engine"), '</td>',
            '<td class = "application_details">', this.model.get("image"), '</td>',
            '<td class = "application_details">', this.model.get("command"), '</td>',
            '<td class = "application_details">', this.model.get("cpus"), '</td>',
            '<td class = "application_details">', this.model.get("memory"), 'MB', '</td>',
            '<td class = "application_details">', loaded_containers.length, '/', containers.length, '</td>',
            '<td>',
                '<div class="ui dropdown">',
                    '<i class="setting icon"></i>',
                    '<div class="menu">',
                        '<div class="header">Actions</div>',
                        '<div class="item scale-application">',
                            '<div class="ui green empty circular label"></div>',
                            'Scale',
                        '</div>',
                        '<div class="item delete-application">',
                            '<div class="ui red empty circular label"></div>',
                            'Delete',
                        '</div>',
                    '</div>',
                '</div>',
            '</td>'
        ]

        $(this.el).html(content.join(""));
        $(this.el).find(".dropdown").dropdown();
        $("#applicationList tbody").append(this.el);
    },

    application_details: function(){
        window.location = ["", "#", "applications", this.model.get("id")].join("/");
    },

    scale_application: function(){
        this.model.get("views").modal.scale.render();
    },

    remove: function(){
        $(this.el).remove();
    },

    delete_application: function(){
        var self = this;
        this.model.get("views").modal.delete.render(function(success){
            if(success)
                self.remove();
        });
    }

});
