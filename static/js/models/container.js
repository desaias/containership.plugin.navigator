window.Containership.Models.Container = Backbone.Model.extend({

    initialize: function(){
        this.set("views", {
            list: new Containership.Views.ContainerListView({model: this}),
            modal: {
                view: new Containership.Views.ViewContainerModal({model: this}),
                delete: new Containership.Views.DeleteContainerModal({model: this})
            }
        });
    },

    url: function(){
        return ["http://", window.location.hostname, ":8080/v1/applications/", this.get("application"), "/containers/", this.get("id")].join("");
    }

});
