Containership.Views.DeleteContainerModal = Backbone.View.extend({

    tagName: "div",

    id: "deleteContainerModal",

    className: "ui basic modal",

    events: {},

    initialize: function(){},

    render: function(){
        var self = this;

        var content = [
            '<i class = "close icon"></i>',
            '<div class = "header">', 'Delete ', this.model.get("application"), '-', this.model.get("id"), '</div>',
            '<div class = "content">',
                '<div class = "image">',
                    '<i class = "warning square icon"></i>',
                '</div>',
                '<div class = "description">',
                    '<p>', 'Are you sure you want to delete this container? This action cannot be undone.', '</p>',
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
            '</div>'
        ]
        $(this.el).html(content.join(""));
        $(this.el).modal({
            onHidden: function(){
                self.remove();
            },
            onApprove: function(){
                self.model.destroy({
                    success: function(err){
                        self.model.get("views").list.remove();
                    }
                });
            }
        }).modal("show");
        $("#main").append(this.el);
    }

});
