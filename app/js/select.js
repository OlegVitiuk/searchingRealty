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

                    self.listenKeyboard();
                    self.disableScroll();

                    if($(this).hasClass("unchecked") && !$(this).hasClass("InputFlag")) {
                        item.css({
                            "display": "block",
                            "border-left":"2px solid #30AE63",
                            "border-right":"2px solid #30AE63",
                            "box-shadow":"0 5px 10px rgba(0,0,0,0.22)"
                        }).last().css("border-bottom","2px solid #30AE63");
                        $(this).removeClass("unchecked").css({
                            "border-top":"2px solid #30AE63",
                            "border-left":"2px solid #30AE63",
                            "border-right":"2px solid #30AE63",
                            "border-radius":0
                        });
                        arrow.attr("src","images/selectArrowOutwards.png");
                    }

                    else{
                        self.enableScroll();

                        item.css("display", "none");
                        $(this).addClass("unchecked").removeClass("InputFlag");
                        arrow.attr("src","images/selectArrow.png");
                        $(this).css({
                            "border-top":"2px solid #dfe3e6",
                            "border-left":"2px solid #dfe3e6",
                            "border-right":"2px solid #dfe3e6",
                            "border-radius":"3px"
                        });
                    }
                });
                item.hover(function () {

                            item.css({
                                "border":"0",
                                "background-color": "#30AE6",
                                //"color":"#152935"
                            });
                            self.$elem.css("border","2px solid #dfe3e6");

                    })
                    .on("click",function () {
                        if($(this).hasClass("noClick")){
                            item.css("display", "block");
                            self.$elem.addClass("InputFlag");
                        } else{
                            var selectedItem = $(this).text().trim();

                            item.css("display", "none");
                            self.$elem.find(".selectVisibleText_header").text(selectedItem);
                            self.options.value = selectedItem;
                        }
                        self.$elem.addClass("unchecked").css({
                            "border-top":"2px solid #dfe3e6",
                            "border-left":"2px solid #dfe3e6",
                            "border-right":"2px solid #dfe3e6",
                            "border-radius":"3px"
                        });

                        if(self.$elem.hasClass("InputFlag")){
                            arrow.attr("src","images/selectArrowOutwards.png");
                        }else {
                            arrow.attr("src", "images/selectArrow.png");
                        }
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

                if(self.options.autocomplete) {
                    $(".selectItem_header input").keyup(function () {
                        var val = $(this).val().toLowerCase();

                        item.hide();
                        item.each(function () {
                            var text = $(this).text().toLowerCase().trim();
                            if (text.startsWith(val)|| $(this).hasClass("noClick")) {
                                $(this).show();
                            }
                        });
                    });
                }
                else{
                    $(".noClick").find(".selectItem_header").hide();
                }
            },

        getValue: function () {
            var self = this;

            return self.options.value;
             },

        listenKeyboard: function () {
            var self = this;
            var arrow = $(".selectVisibleArrow_header");
            var item =$(".choose__city__content_select-item");
            var items = $(".choose__city__content_select-item:not(.noClick)");
            var node = null;
            var i = 0,j=0;

            $("body").keydown(function (e) {

                function resetBackgroundColor(){
                    items.css({
                        "background-color":"#FFFFFF",
                    }).find(".selectVisibleText_header").css({
                        "color":"#152935"
                    });
                }

                switch(e.which)
                {
                    // клавиша Esc"
                    case 27:
                        self.hideMyItems();
                        break;
                    //клавиша Enter
                    case 13:
                        (function () {
                            item.hover(function () {
                                item.data("selectedItem",$(this).text().trim());
                            });
                            self.$elem.find(".selectVisibleText_header").text(item.data("selectedItem"));
                            self.hideMyItems();
                            self.send_form("select");
                        })();
                        break;
                    //клавиша Down
                    case 40: (function() {
                        items.hover(function () {
                            resetBackgroundColor();
                            $(this).css({
                                "background-color":"#30AE63"
                            }).find(".selectVisibleText_header").css({
                                "color":"#FFFFFF"
                            });
                        });
                        resetBackgroundColor();
                        if(node==null) {
                            node = items.first().css({
                                "background-color": "#30AE63"
                            });
                            node.find(".selectVisibleText_header").css({
                                "color":"#FFFFFF"
                            });
                            return;
                        }
                        node = node.next();
                            if(node != null && i++<items.length-1){
                                node.css({
                                    "background-color":"#30AE63"
                                });
                                node.find(".selectVisibleText_header").css({
                                    "color":"#FFFFFF"
                                });
                            }
                            else {
                                node = null;
                                i=0;
                            }
                    })();
                        break;
                    //клавиша Up
                    case 38: (function() {
                        var items = $(".choose__city__content_select-item:not(.noClick)");
                        resetBackgroundColor();
                        if(node == null) {
                            node = items.last().css({
                                "background-color": "#30AE63"
                            });
                            node.find(".selectVisibleText_header").css({
                                "color":"#FFFFFF"
                            });
                            return;
                        }
                        node = node.prev();
                        if(node!= null && j++<items.length-1){
                            node.css({
                                "background-color":"#30AE63"
                            });
                            node.find(".selectVisibleText_header").css({
                                "color":"#FFFFFF"
                            });
                        }
                        else {
                            node = null;
                            j=0;
                        }
                    })();
                        break;
                }
            });
        },

        hideMyItems: function () {
            var self = this;

            var arrow = $(".selectVisibleArrow_header");
            var item =$(".choose__city__content_select-item");

            item.css("display", "none");
            self.$elem.addClass("unchecked").removeClass("InputFlag").css({
                "border-top":"2px solid #dfe3e6",
                "border-left":"2px solid #dfe3e6",
                "border-right":"2px solid #dfe3e6",
                "border-radius":"3px"
            });
            arrow.attr("src","images/selectArrow.png");
        },

        preventDefault: function(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    },

        disableScroll: function() {
            var self = this;

        function preventDefaultForScrollKeys(e) {
            var keys = {38: 1, 40: 1};
            if (keys[e.keyCode]) {
                self.preventDefault(e);
                return false;
            }
        }

        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', self.preventDefault, false);
        //window.onwheel = preventDefault; // modern standard
        //window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = self.preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    },

        enableScroll: function () {
            var self = this;

        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', self.preventDefault, false);
        // window.onmousewheel = document.onmousewheel = null;
        // window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    },

        //отправить данные на сервер
        send_form: function(form_id,e) {
        var form = $('#'+form_id);
        var msg   = form.serialize();
        $.ajax({
            type: 'POST',
            url: '', // Обработчик собственно
            data: msg,
            success: function(data) {
                // запустится при успешном выполнении запроса и в data будет ответ скрипта
            },
            error:  function(){
                // запустится при ошибочным выполнении запроса и в data будет ответ скрипта
            }
        });

    }
    };

    $.fn.selectPlugin=function (options) {
        return this.each(function () {

            var select = Object.create(Select);
            select.init(options,this);
        });
    };

    $.fn.selectPlugin.options={
        value: "Киев",
        placeholder: "Киев",
        autocomplete: true
    };
})(jQuery);
