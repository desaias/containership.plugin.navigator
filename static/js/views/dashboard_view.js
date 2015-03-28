Containership.Views.DashboardView = Backbone.View.extend({

    tagName: "div",

    className: "grid ui",

    events: {},

    initialize: function(){},

    render: function(){
        var self = this;

        var hosts_by_mode = _.groupBy(Containership.collections.hosts.models, function(host){
            return host.get("mode");
        });

        var num_containers = _.map(Containership.collections.hosts.models, function(host){
            return host.get("containers").length;
        });

        num_containers = _.reduce(num_containers, function(sum, n){
            return sum + n;
        });

        var num_leaders = !_.isUndefined(hosts_by_mode.leader) ? hosts_by_mode.leader.length : 0;
        var num_followers = !_.isUndefined(hosts_by_mode.follower) ? hosts_by_mode.follower.length : 0;

        var overhead = 32;
        var used_cpus = 0;
        var used_memory = 0;
        var available_cpus = 0;
        var available_memory = 0;

        _.each(Containership.collections.hosts.models, function(host){
            if(host.get("mode") == "follower"){
                var _used_cpus = 0;
                var _used_memory = 0;

                _.each(host.get("containers"), function(container){
                    _used_cpus += parseFloat(container.cpus);
                    _used_memory += _.parseInt(container.memory) + overhead;
                });

                used_cpus += _used_cpus;
                used_memory += _used_memory;

                _available_cpus = parseFloat(host.get("cpus")) - _used_cpus;
                _available_memory = (_.parseInt(host.get("memory")) / (1024 * 1024)) - _used_memory;

                available_cpus += _available_cpus;
                available_memory += _available_memory;
            }
        });

        used_cpus = used_cpus.toFixed(2);
        available_cpus = available_cpus.toFixed(2);

        var content = [
            '<div class = "two column row">',
                '<div class = "sixteen wide column">',
                    '<h1>', 'Cluster ID: ', this.model.get("id"), '</h1>',
                '</div>',
            '</div>',
            '<div class = "one column row">',
                '<div class = "sixteen wide column">',
                    '<h4 class="ui horizontal header divider">Overview</h4>',
                    '<table class = "ui table">',
                        '<thead>',
                            '<tr>',
                                '<th>Leaders</th>',
                                '<th>Followers</th>',
                                '<th>Applications</th>',
                                '<th>Containers</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tr>',
                                '<td>', '<a href = "/#/hosts">', num_leaders, '</a>', '</td>',
                                '<td>', '<a href = "/#/hosts">', num_followers, '</a>', '</td>',
                                '<td>', '<a href = "/#/applications">', Containership.collections.applications.models.length, '</a>', '</td>',
                                '<td>', num_containers, '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>',
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
                    '<h4 class="ui horizontal header divider">Plugins</h4>',
                    '<table id = "plugins" class = "ui table">',
                        '<thead>',
                            '<tr>',
                                '<th>Name</th>',
                                '<th>Version</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                        '</tbody>',
                    '</table>',
                '</div>',
            '</div>'
        ]

        $(this.el).html(content.join(""));
        $("#main").html(this.el);
    }

});
