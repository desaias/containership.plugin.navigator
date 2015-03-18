Containership.Views.ApplicationsView = Backbone.View.extend({

    tagName: "div",

    events: {
        "click #createApplication": "create_application"
    },

    initialize: function(){},

    render: function(){
        var content = [
            '<div class = "column right aligned">',
                '<div id = "createApplication" class = "ui segment right aligned green button">Create Application</div>',
            '</div>',
            '<table id = "applicationList" class = "ui table">',
                '<thead>',
                    '<tr>',
                        '<th>ID</th>',
                        '<th>Engine</th>',
                        '<th>Image</th>',
                        '<th>Command</th>',
                        '<th>CPUs</th>',
                        '<th>Memory</th>',
                        '<th>Containers</th>',
                        '<th></th>',
                    '</tr>',
                '</thead>',
                '<tbody>',
                '</tbody>',
            '</table>'
        ]

        $(this.el).html(content.join(""));
        $("#main").html(this.el);
    },

    create_application: function(){
        var new_application = new Containership.Models.Application();
        new_application.url = function(){
            return ["http://", window.location.hostname, ":8080/v1/applications/", this.get("name")].join("");
        }
        new_application.get("views").modal.create.render();
    }

});
