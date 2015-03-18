Containership.Views.UpdateApplicationModal = Backbone.View.extend({

    tagName: "div",

    id: "updateApplicationModal",

    className: "ui small modal",

    events: {
        "keyup #appId": "setId",
        "keyup #appImage": "setImage",
        "keyup #appCommand": "setCommand",
        "keyup #appCPUs": "setCPUs",
        "keyup #appMemory": "setMemory",
        "keyup #appContainerPort": "setContainerPort",
        "change #network_mode_inputs input[type=radio]": "setNetworkMode",
        "change #respawn_inputs": "setRespawn"
    },

    initialize: function(){},

    render: function(){
        var content = [
            '<i class = "close icon"></i>',
            '<div class = "header">', 'Update ', this.model.get("id"), '</div>',
            '<div class = "content">',
                '<div class="ui form grid">',
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
                            '<div class="ui category search">',
                                '<input id = "appImage" class="prompt" type="text" placeholder="Image" autocomplete="off" value = "', this.model.get("image"), '">',
                                '<div id = "autocompleteResults" class="results"></div>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Command</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id = "appCommand" type="text" value="', this.model.get("command"), '">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Network Mode</label>',
                        '</div>',
                        '<div id="network_mode_inputs" class = "twelve wide column fluid">',
                            '<div class="ui radio checkbox">',
                              '<input type="radio" name="network" value="bridge"', this.model.get("network_mode") == "bridge" ? 'checked' : '', '>',
                              '<label>Bridge</label>',
                            '</div>',
                            '<div class="ui radio checkbox" style="margin-left:25px">',
                              '<input type="radio" name="network" value="host"', this.model.get("network_mode") == "host" ? 'checked' : '', '>',
                              '<label>Host</label>',
                            '</div>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>CPUs</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appCPUs" type="text" value="', this.model.get("cpus"), '">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Memory</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appMemory" type="text" value="', this.model.get("memory"), '">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Container Port</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<input id="appContainerPort" type="text" value="', this.model.get("container_port"), '">',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<label>Respawn Containers</label>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<div id = "respawn_inputs" class = "ui toggle checkbox">',
                                '<input type="checkbox"', this.model.get("respawn") ? 'checked' : '', '>',
                                '<label></label>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class = "actions">',
                '<div class="ui red button">Cancel</div>',
                '<div class="ui ok green button">Save</div>',
            '</div>'
        ]

        var self = this;

        $(this.el).html(content.join(""));
        $(this.el).modal({
            onHidden: function(){
                self.remove();
            },
            onApprove: function(){
                self.model.save({
                    success: function(){
                        window.location.reload();
                    },
                    error: function(){
                    }
                });
            }
        }).modal("show");
        $("#main").append(this.el);
        $(".checkbox").checkbox();
        $('.ui.search').search({
            maxResults: 10,
            apiSettings: {
                action: "search",
                url: "/autocomplete?q={query}&size=10"
            }
        });
    },

    set_image: function(element){
        this.model.set({image: $("#appImage").val()});
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
    }

});
