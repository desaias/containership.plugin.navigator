Containership.Views.ApplicationDetails = Backbone.View.extend({

    tagName: "div",

    className: "grid ui",

    events: {
        "click #deleteButton": "delete_application"
    },

    initialize: function(){},

    render: function(){
        var content = [
            '<div class = "two column row">',
                '<div class = "eight wide column">',
                    '<h1>', this.model.get("id"), '</h1>',
                '</div>',
                '<div class = "eight wide column right aligned">',
                    '<div class="ui buttons">',
                        '<div class="ui button">Update</div>',
                        '<div class="or"></div>',
                        '<div id = "deleteButton" class="ui negative button">Delete</div>',
                    '</div>',
                '</div>',
            '</div>',
            '<div class = "one column row">',
                '<div class = "sixteen wide column">',
                    '<h4 class="ui horizontal header divider">Configuration</h4>',
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
                '<div class = "sixteen wide column">',
                    '<h4 class="ui horizontal header divider">Containers</h4>',
                    '<table class = "ui table">',
                        '<thead>',
                            '<tr>',
                                '<th>ID</th>',
                                '<th>Host</th>',
                                '<th>Start Time</th>',
                                '<th>Host Port</th>',
                                '<th>Container Port</th>',
                                '<th>Status</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            _.map(this.model.get("containers"), function(container){
                                if(_.isUndefined(container.start_time) || _.isNull(container.start_time))
                                    var start_time = "-";
                                else
                                    var start_time = new Date(container.start_time);

                                if(!_.isNull(container.host))
                                    var host = ['<a href = "/#/hosts/', container.host, '">', container.host, '</a>'].join("");
                                else
                                    var host = "-";

                                var content = [
                                    '<tr>',
                                        '<td>', container.id, '</td>',
                                        '<td>', host, '</td>',
                                        '<td>', start_time, '</td>',
                                        '<td>', container.host_port, '</td>',
                                        '<td>', container.container_port || container.host_port, '</td>'
                                ]

                                if(container.status == "loaded")
                                    content.push('<td class = "positive">', container.status, '</td>');
                                else if(container.status == "loading")
                                    content.push('<td class = "warning">', container.status, '</td>');
                                else
                                    content.push('<td class = "negative">', container.status, '</td>');

                                content.push('</tr>');
                                return content.join("");
                            }).join(""),
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>',
            '<div class = "ui basic modal" id = "applicationDelete">',
                '<i class = "close icon"></i>',
                '<div class = "header">', 'Delete ', this.model.get("id"), '</div>',
                '<div class = "content">',
                    '<div class = "image">',
                        '<i class = "warning square icon"></i>',
                    '</div>',
                    '<div class = "description">',
                        '<p>', 'Are you sure you want to delete this application? This action cannot be undone.', '</p>',
                    '</div>',
                '</div>',
                '<div class = "actions">',
                    '<div class = "two fluid ui inverted buttons">',
                        '<div class = "ui red basic inverted button">',
                            '<i class = "remove icon">No</i>',
                        '</div>',
                        '<div class = "ui green basic inverted button ok">',
                            '<i class = "checkmark icon">Yes</i>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ]

        $(this.el).html(content.join(""));
        $("#main").html(this.el);
    },

    delete_application: function(){
        var self = this;
        $("#applicationDelete").modal({
            onApprove: function(){
                self.model.destroy({
                    success: function(){
                        window.location = ["", "#", "applications"].join("/");
                    }
                });
            }
        }).modal("show");
    }

});

