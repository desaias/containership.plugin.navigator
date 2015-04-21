Containership.Views.CreateApplicationModal = Backbone.View.extend({

    tagName: "div",

    id: "applicationCreate",

    className: "ui small modal",

    events: {
        "keyup #appId": "set_id",
        "keyup #appImage": "set_image",
        "keyup #appCommand": "set_command",
        "keyup #appCPUs": "set_cpus",
        "keyup #appMemory": "set_memory",
        "keyup #appHostVolume": "set_volumes",
        "keyup #appContainerVolume": "set_volumes",
        "keyup #appContainerPort": "set_container_port",
        "change #network_mode_inputs input[type=radio]": "set_network_mode",
        "change #respawn_inputs input[type=checkbox]": "set_respawn",
        "click #autocompleteResults": "set_image",
        "click .plusbutton": "add_envvar",
        "click .minusbutton": "remove_envvar"
    },

    initialize: function(){},

    render: function(){
        var content = [
            '<i class = "close icon"></i>',
            '<div class = "header">Create Application</div>',
            '<div class = "content">',
                '<div class="ui form grid">',
                    '<div class = "two column row">',
                        '<div class = "four wide column">',
                            '<label class = "createLabel">ID:</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id = "appId" type="text" placeholder="ID" autocomplete="off">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Engine</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<div class="ui radio checkbox">',
                                '<input type="radio" name="Docker" checked>',
                                '<label>Docker</label>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Image</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<div class="ui category search image-wrapper">',
                                '<input id = "appImage" class="prompt" type="text" placeholder="Image" autocomplete="off">',
                                '<div id = "autocompleteResults" class="results"></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Command</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id = "appCommand" type="text" placeholder="Command" autocomplete="off">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Network Mode</label>',
                        '</div>',
                        '<div id="network_mode_inputs" class = "twelve wide column fluid">',
                            '<div class="ui radio checkbox">',
                              '<input type="radio" name="network" value="bridge" checked>',
                              '<label>Bridge</label>',
                            '</div>',
                            '<div class="ui radio checkbox" style="margin-left:25px">',
                              '<input type="radio" name="network" value="host">',
                              '<label>Host</label>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>CPUs</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appCPUs" type="text" placeholder="CPUs">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Memory</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appMemory" type="text" placeholder="Memory">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Container Port</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appContainerPort" type="text" placeholder="Container Port">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Host Volume</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appHostVolume" type="text" placeholder="Host Volume">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Container Volume</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appContainerVolume" type="text" placeholder="Container Volume">',
                        '</div>',
                    '</div>',
                    '<div class="three column row envvars">',
                        '<div class = "four wide column">',
                            '<label>Environment Variables</label>',
                        '</div>',
                        '<div class = "ten wide column fluid">',
                            '<div class="ui category search envvar-wrapper">',
                                '<input id="newEnvVar" class="prompt envvar" type="text" placeholder="KEY=VALUE" autocomplete="off">',
                                '<div id = "envvarAutocompleteResults" class="results"></div>',
                            '</div>',
                        '</div>',
                        '<div class = "two wide column fluid">',
                            '<i class="plusbutton plus square outline icon big"></i>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Respawn Containers</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<div id = "respawn_inputs" class = "ui toggle checkbox">',
                                '<input type="checkbox" checked>',
                                '<label></label>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class = "actions">',
                '<div class="ui red button">Cancel</div>',
                '<div class="ui ok green button">OK</div>',
            '</div>'
        ]

        var self = this;

        $(this.el).html(content.join(""));
        var self = this;
        $(this.el).modal({
            onHidden: function(){
                self.remove();
            },
            onApprove: function(){
                self.model.save({
                    success: function(){
                        window.location = ["", "#", "applications", this.model.get("id")].join("/");
                    }
                });
            }
        }).modal("show");
        $("#main").append(this.el);
        $(".checkbox").checkbox();
        $(".image-wrapper").search({
            maxResults: 10,
            apiSettings: {
                action: "search",
                url: "/autocomplete?q={query}&size=10"
            }
        });

        var content = [];

        _.each(Containership.collections.applications.models, function(model){
            content.push({
                title: ["$CS", "ADDRESS", model.id.toUpperCase()].join("_"),
                description: ["Returns url to route to", model.id].join(" ")
            });
            content.push({
                title: ["$CS", "DISCOVERY", "PORT", model.id.toUpperCase()].join("_"),
                description: ["Returns discovery port for", model.id].join(" ")
            });
        });

        $(".envvar-wrapper").search({
            source: content,
            cache: false,
            searchFields: [ "description" ]
        });
    },

    set_id: function(element){
        this.model.set({name: $(element.target).val()});
    },

    set_image: function(element){
        this.model.set({image: $("#appImage").val()});
    },

    set_volumes: function(element){
        this.model.set({volumes: [
            {
                host: $("#appHostVolume").val(),
                container: $("#appContainerVolume").val()
            }
        ]});
    },

    set_command: function(element){
        this.model.set({command: $(element.target).val()});
    },

    set_cpus: function(element){
        this.model.set({cpus: $(element.target).val()});
    },

    set_memory: function(element){
        this.model.set({memory: $(element.target).val()});
    },

    set_container_port: function(element){
        if($(element.target).val() != null && $(element.target).val() != "")
            this.model.set({container_port: $(element.target).val()});
    },

    set_network_mode: function(element){
        this.model.set({network_mode: $(element.target).val()});
    },

    set_respawn: function(element){
        this.model.set({respawn: !$(element.target).parent().hasClass("checked")});
    },

    add_envvar: function(){
        var content = [
            '<div class = "envvar-wrapper three column row">',
                '<div class = "four wide column fluid">',
                '</div>',
                '<div class = "ten wide column fluid">',
                    '<input class="envvar" disabled="disabled" type="text" placeholder="KEY=VALUE" value="', $("#newEnvVar").val(), '">',
                '</div>',
                '<div class = "two wide column fluid">',
                    '<i class="minusbutton minus square outline icon big"></i>',
                '</div>',
            '</div>'
        ]
        if($("#newEnvVar").val().indexOf("=") != -1){
            $(".envvars").after(content.join(""));

            var env_vars = this.model.get("env_vars") || {};
            var parts = $("#newEnvVar").val().split("=");
            env_vars[parts[0]] = parts[1];
            $("#newEnvVar").val("");
            this.model.set({env_vars: env_vars});
        }
    },

    remove_envvar: function(element){
        var env_vars = this.model.get("env_vars");
        var parts = $(element.target).parent().prev().find("input").val().split("=");
        delete env_vars[parts[0]];
        this.model.set({env_vars: env_vars});
        $(element.target).parents(".envvar-wrapper").remove();
    }

});
