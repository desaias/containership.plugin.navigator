Containership.Views.HostDetails = Backbone.View.extend({

    tagName: "div",

    className: "grid ui",

    initialize: function(){},

    events: {
        "click #deleteButton": "delete_host"
    },

    render: function(){
        var content = [
            '<div class = "two column row">',
                '<div class = "eight wide column">',
                    '<h1>', this.model.get("host_name"), '</h1>',
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
                                '<th>ID</th>',
                                '<th>Public IP</th>',
                                '<th>Private IP</th>',
                                '<th>Port</th>',
                                '<th>Mode</th>',
                                '<th>Controlling Leader</th>',
                                '<th>Tags</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tr>',
                                '<td>', this.model.get("id"), '</td>',
                                '<td>', '<a href = "ssh://', this.model.get("address").public, '">', this.model.get("address").public, '</a>', '</td>',
                                '<td>', '<a href = "ssh://', this.model.get("address").private, '">', this.model.get("address").private, '</a>', '</td>',
                                '<td>', this.model.get("port"), '</td>',
                                '<td>', this.model.get("mode"), '</td>',
                                '<td>', this.model.get("praetor").leader, '</td>',
                                '<td>', this.model.get("tags"), '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>'
        ]

        if(this.model.get("mode") == "follower"){
            var overhead = 32;
            var used_cpus = 0;
            var used_memory = 0;

            _.each(this.model.get("containers"), function(container){
                used_cpus += parseFloat(container.cpus);
                used_memory += _.parseInt(container.memory) + overhead;
            });

            used_cpus = used_cpus.toFixed(2);

            var available_cpus = parseFloat(this.model.get("cpus")) - used_cpus;
            available_cpus = available_cpus.toFixed(2);
            var available_memory = (_.parseInt(this.model.get("memory")) / (1024 * 1024)) - used_memory;

            content.push([
                '<div class = "one column row"></div>',
                '<div class = "one column row">',
                    '<div class = "sixteen wide column">',
                        '<h4 class="ui horizontal header divider">Resources</h4>',
                        '<table class = "ui table">',
                            '<thead>',
                                '<tr>',
                                    '<th>Used CPUs</th>',
                                    '<th>Available CPUs</th>',
                                    '<th>Used Memory</th>',
                                    '<th>Available Memory</th>',
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                '<tr>',
                                    '<td>', used_cpus, '</td>',
                                    '<td>', available_cpus, '</td>',
                                    '<td>', used_memory, 'MB', '</td>',
                                    '<td>', Math.floor(available_memory), 'MB', '</td>',
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
                                    '<th>Application</th>',
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

                                    var content = [
                                        '<tr>',
                                            '<td>', container.id, '</td>',
                                            '<td>', '<a href = "/#/applications/', container.application, '">', container.application, '</a>', '</td>',
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
                '</div>'
            ].join(""));
        }

        content.push([
            '<div class = "ui basic modal" id = "hostDelete">',
                '<i class = "close icon"></i>',
                '<div class = "header">', 'Delete ', this.model.get("host_name"), '</div>',
                '<div class = "content">',
                    '<div class = "image">',
                        '<i class = "warning square icon"></i>',
                    '</div>',
                    '<div class = "description">',
                        '<p>', 'Are you sure you want to delete this host? It will be disconnected from the cluster.', '</p>',
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
        ].join(""));

        $(this.el).html(content.join(""));
        $("#main").html(this.el);
    },

    delete_host: function(){
        var self = this;
        $("#hostDelete").modal({
            onApprove: function(){
                self.model.destroy({
                    success: function(){
                        window.location = ["", "#", "hosts"].join("/");
                    }
                });
            }
        }).modal("show");
    }

});

