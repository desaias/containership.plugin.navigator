Containership.Views.Tag = Backbone.View.extend({

    tagName: "a",

    className: "ui teal image label",

    events: {
        "click .remove-tag": "remove_tag"
    },

    initialize: function(options){
        this.tag = options.tag;
        this.value = options.value;
        this.on_remove = options.on_remove;
    },

    render: function(){
        if($(this.el).find(".detail").length > 0)
            $(this.el).find(".remove-tag").remove();
        else{
            var content = [
                this.tag,
                '<span class="detail">', this.value, '</span>'
            ]

            $(this.el).html(content.join(""));
            $(".tags").append(this.el);
        }
    },

    render_edit: function(){
        if($(this.el).find(".remove-tag").length == 0){
            var content = '<i style="margin-left:15px" class="remove-tag delete icon"></i>';
            $(this.el).append(content);
        }
    },

    remove_tag: function(){
        this.remove();
        this.on_remove(this.tag);
    }
});
