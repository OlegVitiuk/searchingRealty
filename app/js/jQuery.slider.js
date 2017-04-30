(function( $ ){

$.fn.slider = function(){
      var defaults = {};
      defaults.infinet = true;
      defaults.index = 0;
      defaults.slidesVisible = 1;
      defaults.slidesToScroll = 1;
      defaults.arrows = true;
      defaults.swipeAble = true;
      defaults.pagination = true;
      defaults.autoplay = true;
      defaults.autoplaySpeed = 1000;
  
    var options = $.extend({}, defaults, options);
    var elem = this;
    var elemWidth = 202;
    var slides = $('.slide');
    var numberofElem = length.slides;
    //$('#slidesContainer').css('overflow', 'hidden');
      $('#slidesContainer').css('left','0px');
      $('#slidesContainer').css('position','relative');
      $('#slidesContainer').css('width','elemWidth*numberofElem');
   // $('#slidesContainer>div:last-child').prependTo('#slidesContainer');

    slidesVisible = elem.width/elemWidth>>0;
      $('<span class ="control_next">Next</span>').appendTo('#slidesShow');
      $('<span class = "control_prev">Prev</span>').prependTo('#slidesShow');
     
 $('.control_next').click(function(){
              $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 $('#slidesContainer>div:first-child').appendTo('#slidesContainer');
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer').css('left','0px')
                });
             }); 
    $('.control_prev').click(function(){
                $('#slidesContainer').animate({
                left: +elemWidth    
               }, 1000, function(){
              $('#slidesContainer>div:last-child').prependTo('#slidesContainer');
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                  $('#slidesContainer').css('left','0px')

               });
             });

$( window ).on( "swipe", function( event ) { 
  var swipestart = touchstart(x);
  var swipeend = touchend(x);
  $('slidesContainer').animate({
    left: +swipestart-swipeend
  }, 1000, function(){
    for(var i = 1; i<=math.abs((swipestart-swipeend)/elemWidth >>0); i++){
      if ((swipestart-swipeend)<0){
        $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer>div:first-child').appendTo('#slidesContainer');
                $('#slidesContainer').css('left','0px')
                   })
      }else{
        $('#slidesContainer').animate({
                left: +elemWidth
               }, 1000, function(){
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                $('#slidesContainer>div:last-child').prependTo('#slidesContainer');
                $('#slidesContainer').css('left','0px')
               });
      };
    };
  });
} );
        


$('#slidesContainer').mouseout(function(){
  setInterval(function () {
    $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 options.index != 1
               ? options.index-1 : optionsindex = numberofElem;
                 $('#slidesContainer>div:first-child').appendTo('#slidesContainer');
                 $('#slidesContainer').css('left','0px')
               })
  }, options.autoplaySpeed);
});

};
}(jQuery))

$(document).ready(function(){
  $('.slidesShow').slider();
})
