Containership.Views.ApplicationDetails = Backbone.View.extend({

    tagName: "div",

    id: "applicationDetails",

    className: "grid ui",

    events: {
        "click #deleteApplication": "delete_application",
        "click #scaleApplication": "scale_application",
        "click #editApplication": "edit_application",
        "click #editTags": "edit_tags",
        "click #addTags": "add_tags",
        "click #saveTags": "save_tags",
        "click #cancelSaveTags": "cancel_save_tags"
    },

    initialize: function(){},

    render: function(){
        var self = this;

        var content = [
            '<div class = "two column row">',
                '<div class = "eight wide column">',
                    '<h1>', this.model.get("id"), '</h1>',
                '</div>',
                '<div class = "eight wide column right aligned">',
                    '<div id = "deleteApplication" class="ui negative compact labeled icon button">',
                        '<i class="trash icon"></i>',
                        'Delete',
                    '</div>',
                '</div>',
            '</div>',
            '<div class = "one column row">',
                '<div class = "fourteen wide column">',
                    '<h4 class="ui horizontal header divider">Configuration</h4>',
                '</div>',
                '<div class = "two wide column right aligned">',
                    '<div id = "editApplication" class="application-button ui compact labeled icon button">',
                        '<i class="pencil icon"></i>',
                        'Edit',
                    '</div>',
                '</div>',
                '<div class = "sixteen wide column">',
                    '<table class = "ui table">',
                        '<thead>',
                            '<tr>',
                                '<th>Engine</th>',
                                '<th>Image</th>',
                                '<th>Command</th>',
                                '<th>CPUs</th>',
                                '<th>Memory</th>',
                                '<th>Network Mode</th>',
                                '<th>Container Port</th>',
                                '<th>Discovery Port</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tr>',
                                '<td>', this.model.get("engine"), '</td>',
                                '<td>', this.model.get("image"), '</td>',
                                '<td>', this.model.get("command"), '</td>',
                                '<td>', this.model.get("cpus"), '</td>',
                                '<td>', this.model.get("memory"), 'MB', '</td>',
                                '<td>', this.model.get("network_mode"), '</td>',
                                '<td>', this.model.get("container_port"), '</td>',
                                '<td>', this.model.get("discovery_port"), '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>',
            '<div class = "one column row"></div>',
            '<div class = "one column row">',
                '<div class = "tags-divider fourteen wide column">',
                    '<h4 class="ui horizontal header divider">Tags</h4>',
                '</div>',
                '<div class = "two wide column right aligned">',
                    '<div id = "editTags" class="application-button ui compact labeled icon button">',
                        '<i class="pencil icon"></i>',
                        'Edit',
                    '</div>',
                '</div>',
                '<div class = "sixteen wide column">',
                    '<div class = "tags">',
                    '</div>',
                '</div>',
            '</div>',
            '<div class = "one column row"></div>',
            '<div class = "one column row">',
                '<div class = "fourteen wide column">',
                    '<h4 class="ui horizontal header divider">Containers</h4>',
                '</div>',
                '<div class = "two wide column right aligned">',
                    '<div id = "scaleApplication" class="application-button ui compact labeled icon button">',
                        '<i class="expand icon"></i>',
                        'Scale',
                    '</div>',
                '</div>',
                '<div class = "sixteen wide column">',
                    '<table class = "ui table">',
                        '<thead>',
                            '<tr>',
                                '<th>ID</th>',
                                '<th>Host</th>',
                                '<th>Start Time</th>',
                                '<th>Host Port</th>',
                                '<th>Container Port</th>',
                                '<th>Status</th>',
                                '<th></th>',
                            '</tr>',
                        '</thead>',
                        '<tbody class = "containers">',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>'
        ]

        $(this.el).html(content.join(""));
        $("#main").html(this.el);

        _.each(this.model.get("container_models"), function(container){
            container.get("views").list.application_render($(".containers"));
        });

        this.tags = {};

        _.each(window.flatten(this.model.get("tags")), function(value, tag){
            this.tags[tag] = new Containership.Views.Tag({
                model: this.model,
                value: value,
                tag: tag,
                on_remove: function(tag){
                    delete self.tags[tag];
                }
            });
            this.tags[tag].render();
        }, this);
    },

    edit_application: function(){
        this.model.get("views").modal.update.render();
    },

    add_tags: function(){
        var self = this;
        var val = $(".add-tags-wrapper").find("input").val().replace(/ /g, "");
        var parts = val.split("=");
        if(parts.length == 2){
            var tag = parts[0];
            var value = parts[1];
            this.tags[tag] = new Containership.Views.Tag({
                model: this.model,
                value: value,
                tag: tag,
                on_remove: function(tag){
                    delete self.tags[tag];
                }
            });
            this.tags[tag].render();
            this.tags[tag].render_edit();
        }

        $(".add-tags-wrapper").find("input").val("");
    },

    edit_tags: function(){
        if($(".add-tags-wrapper").length == 0){
            var content = [
                '<div class = "four wide column add-tags-wrapper">',
                    '<div class="ui labeled right icon input">',
                        '<div class="ui teal label">Tag</div>',
                        '<input type="text" placeholder="tag.name=tag_value">',
                        '<i id = "addTags" class="add circle link icon"></i>',
                    '</div>',
                '</div>'
            ]

            $(".tags-divider").before(content.join(""));
            $(".tags-divider").removeClass("fourteen wide column");
            $(".tags-divider").addClass("eight wide column");
            $("#editTags").hide();

            var content = [
                '<div class = "cancel-save-tags-wrapper two wide column right aligned">',
                    '<div id = "cancelSaveTags" class="application-button ui red compact labeled icon button">',
                        '<i class="remove icon"></i>',
                        'Cancel',
                    '</div>',
                '</div>',
                '<div class = "save-tags-wrapper two wide column right aligned">',
                    '<div id = "saveTags" class="application-button ui green compact labeled icon button">',
                        '<i class="checkmark icon"></i>',
                        'Save',
                    '</div>',
                '</div>'
            ]

            $(".tags-divider").after(content.join(""));

            _.each(this.tags, function(view, tag){
                view.render_edit();
            });
        }

    },

    save_tags: function(){
        var self = this;
        var tags = {};
        _.each(this.tags, function(view, tag){
            tags[tag] = view.value;
        });
        this.model.set({"tags": window.unflatten(tags)});

        this.model.save({tags: this.model.get("tags")}, {
            error: function(err){
                self.cancel_save_tags();
            }
        });
    },

    cancel_save_tags: function(){
        var self = this;
        $(".add-tags-wrapper").remove();
        $(".save-tags-wrapper").remove();
        $(".cancel-save-tags-wrapper").remove();
        $("#editTags").show();
        $(".tags-divider").removeClass("eight wide column");
        $(".tags-divider").addClass("fourteen wide column");
        $(".tags").html("");
        this.tags = {};
        _.each(window.flatten(this.model.get("tags")), function(value, tag){
            this.tags[tag] = new Containership.Views.Tag({
                model: this.model,
                value: value,
                tag: tag,
                on_remove: function(tag){
                    delete self.tags[tag];
                }
            });
            this.tags[tag].render();
        }, this);
    },

    scale_application: function(){
        this.model.get("views").modal.scale.render();
    },

    delete_application: function(){
        this.model.get("views").modal.delete.render(function(){});
    }

});
