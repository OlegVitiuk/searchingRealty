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
            self.run();

            String.prototype.startsWith = function(prefix) {
                return this.indexOf(prefix) === 0;
            }
        },

        setDesign: function () {
            var self = this;
            var item =$(".choose__city__content_select-item");
            var arrow = $(".selectVisibleArrow_header");

            self.$elem.on("click",function () {
                if($(this).hasClass("unchecked")) {
                    item.css({
                        "display": "block",
                        "border-left":"2px solid #30AE63",
                        "border-right":"2px solid #30AE63",
                        "box-shadow":"0 5px 10px rgba(0,0,0,0.22)"
                    }).last().css("border-bottom","2px solid #30AE63");;
                    $(this).removeClass("unchecked").css({
                        "border-top":"2px solid #30AE63",
                        "border-left":"2px solid #30AE63",
                        "border-right":"2px solid #30AE63",
                        "border-radius":0
                    });
                    arrow.attr("src","images/selectArrowOutwards.png");
                }
                else{
                    item.css("display", "none");
                    $(this).addClass("unchecked");
                    arrow.attr("src","images/selectArrow.png");
                    $(this).css("border-top","2px solid #dfe3e6").css("border-left","2px solid #dfe3e6").css("border-right","2px solid #dfe3e6").
                    css("border-radius","3px");
                }
            });
            item.hover(function () {
                        item.css("border",0);
                        self.$elem.css("border","2px solid #dfe3e6");
                })
                .on("click",function () {
                    if($(this).hasClass("noClick")){
                        item.css("display", "block");
                    } else{
                        var selectedItem = $(this).text().trim();

                        item.css("display", "none");
                        self.$elem.find(".selectVisibleText_header").text(selectedItem);
                    }
                    self.$elem.addClass("unchecked").css({
                        "border-top":"2px solid #dfe3e6",
                        "border-left":"2px solid #dfe3e6",
                        "border-right":"2px solid #dfe3e6",
                        "border-radius":"3px"
                    });
                    arrow.attr("src","images/selectArrow.png");
                });
        },

        run: function(){
            var self = this;

            self.autocomplete();
        },

    autocomplete: function(){
            var self = this;
            var item =$(".choose__city__content_select-item");

            function strStartsWith(str, prefix) {
                return str.indexOf(prefix) === 0;
            }

            var s="teahdj";
            var d = "te";
            console.log(s.startsWith(d));

            if(self.options.autocomplete) {
                $(".selectItem_header input").keyup(function () {
                    var val = $(this).val().toLowerCase();

                    item.hide();
                    item.each(function () {
                        var text = $(this).text().toLowerCase().trim();
                        // console.log(text,text.length,val,val.length);
                        // console.log(text.startsWith(val));
                        if (text.startsWith(val)|| $(this).hasClass("noClick")) {
                            $(this).show();
                        }
                    });
                });
            }
            else{
                $(".noClick").find(".selectItem_header").hide();
            }
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
