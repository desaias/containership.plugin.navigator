window.Containership.Collections.Plugins = Backbone.Collection.extend({
    model: Containership.Models.Plugin,
    url: ["", "plugins"].join("/")
});
