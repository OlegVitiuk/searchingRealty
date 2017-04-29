(function( $ ){
  $.fn.slider = function(){
      var defaults = {};
      defaulrs.infinet = true;
      defaulrs.index = 0;
      defaulrs.slidesVisible = 1;
      defaulrs.slidesToScroll = 1;
      defaulrs.arrows = true;
      defaulrs.swipeAble = true;
      defaulrs.pagination = true;
      defaulrs.autoplay = true;
      defaulrs.autoplaySpeed = 5000;
  
    var options = $.extend({}, defaults, options, params);
    var elem = this;
    var elemWidth = 202;
    var slides = $('.slide');
    var numberofElem = length.slides;
    $('#slidesContainer').css('overflow', 'hidden');
    
    $('#slidesContainer>div:last-child').prependTo('#slidesContainer');

    slidesVisible = elem.width/elemWidth>>0;

      $('<span class = "control" id = "control_prev">Move Left</span>').prependTo('#slidesContainer');
      $('<span class ="control" id = "control_next">Move Right</span>').appendTo('#slidesContainer');


    $('.control').bind('click', function(){
          if(elem.attr('id')=='control_next'){
              $('#slidesContainer').animate({
                left: -elemWidth
               }, 200, function(){
                 option.index != 0
               ? options.index-1 : option.index = numberofElem-1;
                $('#slidesContainer div:last-child').prependTo('#slidesContainer');
               })
             } else{
                $('#slidesContainer').animate({
                left: +elemWidth
               }, 200, function(){
                 option.index != numberofElem-1
               ? options.index+1 : option.index = 0;
                $('#slidesContainer div:first-child').appendTo('#slidesContainer');
               });
             };
});
$( window ).on( "swipe", function( event ) { 
  var swipestart = touchstart(x);
  var swipeend = touchend(x);
  $('slidesContainer').animate({
    left: +swipestart-swipeend
  }, 200, function(){
    for(var i = 1; i<=math.abs((swipestart-swipeend)/elemWidth >>0); i++){
      if ((swipestart-swipeend)<0){
        $('#slidesContainer').animate({
                left: -elemWidth
               }, 200, function(){
                 option.index != 0
               ? options.index-1 : option.index = numberofElem-1;
                $('#slidesContainer div:last-child').prependTo('#slidesContainer');
               })
      }else{
        $('#slidesContainer').animate({
                left: +elemWidth
               }, 200, function(){
                 option.index != numberofElem-1
               ? options.index+1 : option.index = 0;
                $('#slidesContainer div:first-child').appendTo('#slidesContainer');
               });
      };
    };
  });
} );
        
   // for(var i = 1; i<=(elem.width/elemWidth >>0); i++){

    //}


$('.slidesContainer').mouseleave(function(){
  setInterval(function () {
    $('#slidesContainer').animate({
                left: -elemWidth
               }, 200, function(){
                 option.index != 1
               ? options.index-1 : option.index = numberofElem;
                $('#slidesContainer div:last-child').prependTo('#slidesContainer');
               })
  }, options.autoplaySpeed);
});

  }
})(jQuery)
