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
      defaults.autoPlay = true;
      defaults.autoplaySpeed = 5000;
  
    var options = $.extend({}, defaults, options);
    var elem = this;
    var elemWidth = $('#slidesContainer>div:first-child').width();
    var slides = $('.slide');
    var numberofElem = length.slides;
    
      $('#slidesContainer').css('overflow', 'visible');
      $('#slidesShow').css('overflow', 'hidden');
      $('#slidesShow').css('display', 'flex');
      $('#slidesContainer').css('position','relative');
      $('#slidesContainer').css('width','elemWidth*numberofElem');
      $('#slidesShow').css('width', '100%');
      $('#slidesContainer').css('left','-elemWidth');
    //  $('#slidesContainer>div:last-child').prependTo('#slidesContainer');
  var control = false;
   $('#slidesShow').mouseover(function(){
    if (!control){
      $('<span class = "control_prev">Prev</span>').prependTo('#slidesShow');
      $('<span class ="control_next">Next</span>').appendTo('#slidesShow');     
      control = true;
     }
   });
    $('#slidesShow').mouseout(function(){
      if (control){
        $('.control_next').remove();
        $('.control_prev').remove();
        control = false;
      }
    })

 $('.control_next').click(function(){
              $('#slidesContainer>div:first-child').clone().appendTo('#slidesContainer');
              $('#slidesContainer').animate({
                left: -elemWidth
               }, 500, function(){
                 $('#slidesContainer>div:first-child').remove();
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer').css('left','-elemWidth')
                });
             }); 
    $('.control_prev').click(function(){
                $('#slidesContainer>div:last-child').clone(). prependTo('#slidesContainer');
                $('#slidesContainer').animate({
                left: +elemWidth   
               }, 500, function(){
                 $('#slidesContainer>div:last-child').remove();
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                  $('#slidesContainer').css('left','-elemWidth')

               });
             });

$( window ).on( "swipe", function( event ) { 
  var swipestart = touchstart(x);
  var swipeend = touchend(x);
  $('#slidesContainer').animate({
    left: +swipestart-swipeend
  }, 1000, function(){
    for(var i = 1; i<=math.abs((swipestart-swipeend)/elemWidth >>0); i++){
      if ((swipestart-swipeend)<0){
        $('#slidesContainer>div:first-child').clone().appendTo('#slidesContainer');
        $('#slidesContainer').animate({
                left: -elemWidth*2
               }, 1000, function(){
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer>div:first-child').remove();
                $('#slidesContainer').css('left','-elemWidth')
                   })
      }else{
        $('#slidesContainer>div:last-child').clone().prependTo('#slidesContainer');
        $('#slidesContainer').animate({
                left: +elemWidth
               }, 1000, function(){
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                $('#slidesContainer>div:last-child').remove();
                $('#slidesContainer').css('left','-elemWidth')
               });
      };
    };
  });
} );
     $('#slidesShow').mouseover(function(){
      options.autoPlay = false;
     });
     $('#slidesShow').mouseout(function(){
      options.autoPlay = true;
     })

    
      setInterval(function () {
        if(options.autoPlay){
        $('#slidesContainer>div:first-child').clone().appendTo('#slidesContainer');
        $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 options.index != 1
               ? options.index-1 : optionsindex = numberofElem;
                 $('#slidesContainer>div:first-child').remove();
                 $('#slidesContainer').css('left','0')
               })    
      } 
  }, options.autoplaySpeed);
      
    
    
    
};


}(jQuery))

$(document).ready(function(){
  $('.slidesShow').slider();
})

