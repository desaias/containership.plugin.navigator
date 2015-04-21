window.Containership.Models.Application = Backbone.Model.extend({

    initialize: function(){
        this.set("views", {
            list: new Containership.Views.ApplicationList({model: this}),
            details: new Containership.Views.ApplicationDetails({model: this}),
            modal: {
                create: new Containership.Views.CreateApplicationModal({model: this}),
                scale: new Containership.Views.ScaleContainerModal({model: this}),
                update: new Containership.Views.UpdateApplicationModal({model: this}),
                delete: new Containership.Views.DeleteApplicationModal({model: this})
            }
        });

        this.set("container_models", {});

        _.each(this.get("containers"), function(container){
            _.extend(container, {
                application: this.get("id")
            });

            this.attributes.container_models[container.id] = new Containership.Models.Container(container);
        }, this);
    },

    toJSON: function(){
        var json = {
            engine: "docker",
            image: this.get("image"),
            command: this.get("command"),
            cpus: this.get("cpus"),
            memory: this.get("memory"),
            volumes: this.get("volumes"),
            container_port: this.get("container_port"),
            network_mode: this.get("network_mode"),
            respawn: this.get("respawn"),
            tags: this.get("tags"),
            env_vars: this.get("env_vars")
        }

        return json;
    }

});
