if(typeof Object.create !== 'function'){
    Object.create = function (obj) {
        function F(){};
        F.prototype = obj;
        return new F();
    }
}

(function ($) {
    var Select = {
        //начальная инициализация обьекта
        init: function(options, elem){
                var self = this;
                self.elem = elem;
                self.$elem = $(elem);

                self.options = $.extend({},$.fn.selectPlugin.options, options);

                self.run();

                String.prototype.startsWith = function(prefix) {
                    return this.indexOf(prefix) === 0;
                }
            },

        getOptionsValues: function(){
            var self = this;
            var arr = new Array();

            for(var i=0; i<self.elem.options.length;i++){
                arr.push(self.elem.options[i].text);
            }
            return arr;
        },

        makeElements: function(){
            var self = this;
            var isColor = self.options.colors.length == self.getOptionsValues().length;

            self.$elem.hide();

            var form=$("<form>").insertAfter(self.$elem).addClass("selectForm");
            //make main block element
            var mainUl =$("<ul></ul>").appendTo(form).addClass("choose__city__content_select");
            //creating content for my main block element
            var mainLi=$('<li>').appendTo(mainUl);
            var headerOfSelect =$('<div>').appendTo(mainLi).addClass("select__header unchecked");
            var innerUl= $('<ul>').appendTo(mainLi);

            var titleText=$("<p>").appendTo(headerOfSelect).addClass("selectVisibleText_header").text(self.options.placeholder);
            if(isColor && i!=0) {
                $('<div>').appendTo(headerOfSelect).addClass("colorOfItem");
                titleText.css({
                    "left": "35px"
                });
            }
            $("<img>",{src: "images/selectArrow.png"}).appendTo(headerOfSelect).addClass("selectVisibleArrow_header");
            $("<span>x</span>").appendTo(headerOfSelect).addClass("select__clear");

            //make listItems for innerUl
            var liItem=null;

            for(var i =0;i<self.getOptionsValues().length+1;i++){

                liItem=$("<li>").appendTo(innerUl).addClass("choose__city__content_select-item");

                //search field
                if(i==0){
                    liItem.addClass("noClick");
                    var divInLiItem=$("<div>").appendTo(liItem).addClass("selectItem_header");
                    $('<input>',{type: "text",placeholder: "Just type.."}).appendTo(divInLiItem);
                    continue;
                }
                var divInLiItem=$("<div>").appendTo(liItem).addClass("selectItem_header");

                var textHeadeer=$("<p>").appendTo(divInLiItem).addClass("selectVisibleText_header").text(self.getOptionsValues()[i-1]);

                if(isColor && i!=0) {
                    $('<div>').appendTo(divInLiItem).addClass("colorOfItem").addClass(self.options.colors[i-1]);
                    textHeadeer.css({
                        "left": "35px"
                    });
                }
            }
        },

        //дизайн для селекта
        setDesign: function () {
                var self = this;
                //var item =$(".choose__city__content_select-item");
                //var arrow = $(".selectVisibleArrow_header");
                var item =self.$elem.next().find(".choose__city__content_select-item");
                var arrow = self.$elem.next().find(".selectVisibleArrow_header");
                var selectHeader = self.$elem.next().find(".select__header");

                selectHeader.on("click",function () {
                    selectHeader.addClass("select--focus");

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
                            });
                            selectHeader.css("border","2px solid #dfe3e6");

                    })
                    .on("click",function () {

                        if($(this).hasClass("noClick")){
                            item.css("display", "block");
                            selectHeader.addClass("InputFlag");
                        } else{
                            self.clear();
                            var selectedItem = $(this).text().trim();

                            item.css("display", "none");
                            selectHeader.find(".selectVisibleText_header").text(selectedItem);
                            self.options.value = selectedItem;
                        }
                        selectHeader.addClass("unchecked").css({
                            "border-top":"2px solid #dfe3e6",
                            "border-left":"2px solid #dfe3e6",
                            "border-right":"2px solid #dfe3e6",
                            "border-radius":"3px"
                        });

                        if(selectHeader.hasClass("InputFlag")){
                            arrow.attr("src","images/selectArrowOutwards.png");
                        }else {
                            arrow.attr("src", "images/selectArrow.png");
                        }
                    });
            },

        //запустить
        run: function(){
                var self = this;

                self.getOptionsValues();
                self.makeElements();
                self.setDesign();
                self.autocomplete();
            },

        //реализация автодополнения
        autocomplete: function(){
                var self = this;
                var item =self.$elem.next().find(".choose__city__content_select-item");
                //var item =$(".choose__city__content_select-item");

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

        //гетер для options.value
        getValue: function () {
            var self = this;

            return self.options.value;
             },

        ///ловим нажатие по esc, enter, down , up
        listenKeyboard: function () {
            var self = this;
            //var selectHeader = $(".select__header");
            //var arrow = $(".selectVisibleArrow_header");
            //var item =$(".choose__city__content_select-item");
            //var items = $(".choose__city__content_select-item:not(.noClick)");

            var item =self.$elem.next().find(".choose__city__content_select-item");
            var arrow = self.$elem.next().find(".selectVisibleArrow_header");
            var selectHeader = self.$elem.next().find(".select__header");
            var items = self.$elem.next().find(".choose__city__content_select-item:not(.noClick)");


            var node = null;
            var i = 0,j=0;
            var enterText;

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
                            if(enterText!=undefined) {
                                selectHeader.find(".selectVisibleText_header").text(enterText);
                                self.options.value = enterText;
                                enterText=undefined;
                            }

                            item.hover(function () {
                                item.data("selectedItem",$(this).text().trim());
                            });
                            selectHeader.find(".selectVisibleText_header").text(item.data("selectedItem"));
                            self.hideMyItems();

                            self.enableScroll();
                            self.clear();

                            item.css("display", "none");
                            $(selectHeader).addClass("unchecked").removeClass("InputFlag");
                            arrow.attr("src","images/selectArrow.png");
                            $(selectHeader).css({
                                "border-top":"2px solid #dfe3e6",
                                "border-left":"2px solid #dfe3e6",
                                "border-right":"2px solid #dfe3e6",
                                "border-radius":"3px"
                            });

                            self.send_form("select");
                        })();
                        break;
                    //клавиша Down
                    case 40:
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

                            enterText=node.find(".selectVisibleText_header").text();
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

                                enterText=node.find(".selectVisibleText_header").text();
                            }
                            else {
                                node = null;
                                i=0;
                            }
                        break;
                    //клавиша Up
                    case 38: (function() {
                        resetBackgroundColor();
                        if(node == null) {
                            node = items.last().css({
                                "background-color": "#30AE63"
                            });
                            node.find(".selectVisibleText_header").css({
                                "color":"#FFFFFF"
                            });
                            enterText=node.find(".selectVisibleText_header").text();
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
                            enterText=node.find(".selectVisibleText_header").text();
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

        //спрятать елементы выпадающего списка
        hideMyItems: function () {
            var self = this;

            // var arrow = $(".selectVisibleArrow_header");
            // var item =$(".choose__city__content_select-item");

            var item =self.$elem.next().find(".choose__city__content_select-item");
            var arrow = self.$elem.next().find(".selectVisibleArrow_header");

            item.css("display", "none");
            self.$elem.addClass("unchecked").removeClass("InputFlag").css({
                "border-top":"2px solid #dfe3e6",
                "border-left":"2px solid #dfe3e6",
                "border-right":"2px solid #dfe3e6",
                "border-radius":"3px"
            });
            arrow.attr("src","images/selectArrow.png");
        },

        //запретить действие по умолчанию
        preventDefault: function(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    },

        //отключение скрола для arrow down
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

        //включение скрола для arrow down
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

    },

        //очистить селект
        clear: function () {
            var self = this;
            // var select =$(".select__clear");
            // var selectHeader = $(".select__header");
            var selectHeader = self.$elem.next().find(".select__header");
            var select = self.$elem.next().find(".select__clear");

            select.show().on("click",function (e) {
                selectHeader.find(".selectVisibleText_header").text(self.options.placeholder);
                select.hide();
                e.stopPropagation();
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
        value: "",
        placeholder: "Выберете елемент списка",
        autocomplete: true,
        colors:{}
    };
})(jQuery);
