window.Containership.Models.Plugin = Backbone.Model.extend({

    initialize: function(){
        this.set("views", {
            list: new Containership.Views.PluginList({model: this}),
        });
    }

});
