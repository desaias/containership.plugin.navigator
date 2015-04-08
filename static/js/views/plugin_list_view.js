Containership.Views.PluginList = Backbone.View.extend({

    tagName: "tr",

    events: {
    },

    initialize: function(){
    },

    render: function(){
        var containers = this.model.get("containers");
        var unloaded_containers = _.filter(containers, function(container){
            return container.status == "unloaded"
        });

        if(this.model.get("name").indexOf("containership.plugin.") == 0)
            var name = _.rest(this.model.get("name").split("."), 2).join(".");
        else
            var name = this.model.get("name");

        var content = [
            '<td>', name, '</td>',
            '<td>', this.model.get("version"), '</td>',
        ]

        $(this.el).html(content.join(""));
        $("#plugins tbody").append(this.el);
    }

});
