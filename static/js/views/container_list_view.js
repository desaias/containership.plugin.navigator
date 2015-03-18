Containership.Views.ContainerListView = Backbone.View.extend({

    tagName: "tr",

    events: {
        "click .view-container": "view_container",
        "click .delete-container": "delete_container"
    },

    initialize: function(){},

    application_render: function(parent){
        var container = this.model.attributes;

        if(_.isUndefined(container.start_time) || _.isNull(container.start_time))
            var start_time = "-";
        else
            var start_time = new Date(container.start_time);

        if(!_.isNull(container.host))
            var host = ['<a href = "/#/hosts/', container.host, '">', container.host, '</a>'].join("");
        else
            var host = "-";

        var content = [
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

            content.push([
                '<td>',
                    '<div class="ui dropdown">',
                        '<i class="setting icon"></i>',
                        '<div class="menu">',
                            '<div class="header">Actions</div>',
                            '<div class="item view-container">',
                                '<div class="ui blue empty circular label"></div>',
                                'View',
                            '</div>',
                            '<div class="item delete-container">',
                                '<div class="ui red empty circular label"></div>',
                                'Delete',
                            '</div>',
                        '</div>',
                    '</div>',
                '</td>'
            ].join(""));

        $(this.el).html(content.join(""));
        $(this.el).find(".dropdown").dropdown();
        $(this.el).attr("id", this.model.get("id"));
        parent.append(this.el);
    },

    host_render: function(parent){
        var container = this.model.attributes;

        if(_.isUndefined(container.start_time) || _.isNull(container.start_time))
            var start_time = "-";
        else
            var start_time = new Date(container.start_time);

        var content = [
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

        content.push([
            '<td>',
                '<div class="ui dropdown">',
                    '<i class="setting icon"></i>',
                    '<div class="menu">',
                        '<div class="header">Actions</div>',
                        '<div class="item view-container">',
                            '<div class="ui blue empty circular label"></div>',
                            'View',
                        '</div>',
                        '<div class="item delete-container">',
                            '<div class="ui red empty circular label"></div>',
                            'Delete',
                        '</div>',
                    '</div>',
                '</div>',
            '</td>'
        ].join(""));

        $(this.el).html(content.join(""));
        $(this.el).find(".dropdown").dropdown();
        $(this.el).attr("id", this.model.get("id"));
        parent.append(this.el);
    },

    view_container: function(){
        var self = this;
        this.model.get("views").modal.view.render();
    },

    delete_container: function(){
        var self = this;
        this.model.get("views").modal.delete.render();
    }

});
