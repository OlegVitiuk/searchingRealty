if(typeof Object.create !== 'function'){
    Object.create = function (obj) {
        function F(){};
        F.prototype = obj;
        return new F();
    }
}

(function ($) {
    var Select = {
        init: function(options, elem){
            var self = this;
            self.elem = elem;
            self.$elem = $(elem);

            self.search = (typeof options === 'string')
                ? options
                : options.search;
            self.options = $.extend({},$.fn.selectPlugin.options, options);

            self.setDesign(elem);
        },

        setDesign: function () {
            var self = this;
            self.$elem.on("click",function () {
                if($(this).hasClass("unchecked")) {
                    $(".choose__city__content_select-item").css("display", "block").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63")
                        .css("box-shadow","0 5px 10px rgba(0,0,0,0.22)");
                    $(this).removeClass("unchecked");
                    $(".selectVisibleArrow_header").attr("src","images/selectArrowOutwards.png");
                    $(this).css("border-top","2px solid #30AE63").css("border-left","2px solid #30AE63").css("border-right","2px solid #30AE63").
                    css("border-radius",0);
                    $(".choose__city__content_select-item").last().css("border-bottom","2px solid #30AE63");
                }
                else{
                    $(".choose__city__content_select-item").css("display", "none");
                    $(this).addClass("unchecked");
                    $(".selectVisibleArrow_header").attr("src","images/selectArrow.png");
                    $(this).css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
                    css("border-radius","3px");
                }
            });
            // $(".choose__city__content_select-item").hover(function () {
            //     $(".choose__city__content_select-item").css("border",0);
            //     $(".select__header").css("border","2px solid #dfe3e6");
            // });
            // $(".choose__city__content_select-item").on("click",function () {
            //     if($(this).hasClass("noClick")){
            //         $(".choose__city__content_select-item").css("display", "block");
            //     } else{
            //         $(".choose__city__content_select-item").css("display", "none");
            //         var selectedItem = $(this).text().trim();
            //         $(".select__header .selectVisibleText_header").text(selectedItem);
            //     }
            //     $(".select__header").addClass("unchecked");
            //     $(".selectVisibleArrow_header").attr("src","images/selectArrow.png");
            //     $(".select__header").css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
            //     css("border-radius","3px");
            // });
        }
    };

    $.fn.selectPlugin=function (options) {
        return this.each(function () {

            var select = Object.create(Select);
            select.init(options,this);

        });
    };

    $.fn.selectPlugin.options={
        value: null,
        placeholder: "Kiev",
        autocomplete: true
    };
})(jQuery);
