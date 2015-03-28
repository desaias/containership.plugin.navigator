window.Containership.Router = Backbone.Router.extend({
    routes: {
        "": "dashboard",
        "dashboard": "dashboard",
        "applications": "applications",
        "applications/:application": "application",
        "hosts": "hosts",
        "hosts/:host": "host"
    },

    initialize: function(options){
        this.options = options;
        Backbone.history.start();

        var self = this;

        setInterval(function(){
            self.load_applications(function(){});
            self.load_hosts(function(){});
        }, 5000);
    },

    dashboard: function(){
        var self = this;
        this.load_applications(function(){
            self.load_hosts(function(){
                Containership.models.cluster = new Containership.Models.Cluster();
                Containership.models.cluster.fetch({
                    success: function(){
                        Containership.models.cluster.get("views").dashboard.render();
                        self.load_plugins(function(){
                            _.each(Containership.collections.plugins.models, function(model){
                                model.get("views").list.render();
                            });
                        });
                    },
                    error: function(){}
                });
            });
        });
    },

    load_plugins: function(fn){
        Containership.collections.plugins = new Containership.Collections.Plugins();
        Containership.collections.plugins.fetch({
            success: function(){
                return fn();
            },

            error: function(){
                return fn();
            }
        });
    },

    load_applications: function(fn){
        Containership.collections.applications = new Containership.Collections.Applications();
        Containership.collections.applications.fetch({
            success: function(){
                return fn();
            },

            error: function(){
                return fn();
            }
        });
    },

    load_hosts: function(fn){
        Containership.collections.hosts = new Containership.Collections.Hosts();
        Containership.collections.hosts.fetch({
            success: function(){
                return fn();
            },

            error: function(){
                return fn();
            }
        });
    },

    applications: function(){
        this.load_applications(function(){
            if(_.isUndefined(Containership.views.applications_view))
                Containership.views.applications_view = new Containership.Views.ApplicationsView();

            Containership.views.applications_view.render();

            _.each(Containership.collections.applications.models, function(model){
                model.get("views").list.render();
            });
        });
    },

    application: function(application){
        this.load_applications(function(){
            if(_.isUndefined(Containership.views.application_view))
                Containership.views.application_view = new Containership.Views.ApplicationView();

            Containership.views.application_view.render();
            Containership.collections.applications.get(application).get("views").details.render();
        });
    },

    hosts: function(){
        var self = this;
        this.load_applications(function(){
            self.load_hosts(function(){
                if(_.isUndefined(Containership.views.hosts_view))
                    Containership.views.hosts_view = new Containership.Views.HostsView();

                Containership.views.hosts_view.render();

                _.each(Containership.collections.hosts.models, function(model){
                    model.get("views").list.render();
                });
            });
        });
    },

    host: function(host){
        var self = this;
        this.load_applications(function(){
            self.load_hosts(function(){
                if(_.isUndefined(Containership.views.host_view))
                    Containership.views.host_view = new Containership.Views.HostView();

                Containership.views.host_view.render();
                Containership.collections.hosts.get(host).get("views").details.render();
            });
        });
    }

});
