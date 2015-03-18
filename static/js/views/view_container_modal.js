Containership.Views.ViewContainerModal = Backbone.View.extend({

    tagName: "div",

    id: "viewContainer",

    className: "ui small modal ui top attached",

    events: {},

    initialize: function(){},

    render: function(){
        var self = this;

        var content = [
            '<div class="ui top attached indicating progress" data-percent="100">',
              '<div class="bar" style="-webkit-transition: 300ms; transition: 300ms; width: 100%;"></div>',
            '</div>',
            '<i class = "close icon"></i>',
            '<div class = "header">', this.model.get("application"), '-', this.model.get("id"), '</div>',
            '<div class = "content">',
                '<div class="ui form grid">',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Engine</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("engine"), '</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Image</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("image"), '</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Command</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("command"), '</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Network Mode</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("network_mode"), '</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>CPUs</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("cpus"), '</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Memory</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("memory"), 'MB</label>',
                        '</div>',
                    '</div>',
                    '<div class="two column row">',
                        '<div class = "four wide column">',
                            '<b><label>Container Port</label></b>',
                        '</div>',
                        '<div class = "twelve wide column fluid">',
                            '<label>', this.model.get("container_port"), '</label>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ]

        $(this.el).html(content.join(""));

        if(this.model.get("status") == "loaded")
            $(this.el).find(".progress").addClass("green");
        else if(this.model.get("status") == "loading")
            $(this.el).find(".progress").addClass("yellow");
        else
            $(this.el).find(".progress").addClass("red");

        $(this.el).modal({
            onHidden: function(){
                self.remove();
            }
        }).modal("show");
        $("#main").append(this.el);
    }

});
