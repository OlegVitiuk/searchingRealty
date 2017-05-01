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
   
   return this.each(function(){
    var elem = $(this);
    var elemWidth = $(this).width();
    var slides = $('.slide');
    var numberofElem = length.slides;
    
      $('#slidesContainer').css('overflow', 'visible');
      $('#slidesShow').css('overflow', 'hidden');
      $('#slidesContainer').css('position','relative');
      $('#slidesContainer').css('display','flex');
      $('#slidesContainer').css('width','elemWidth*numberofElem');
  $('<span class ="control_next">Next</span>').appendTo('#slidesShow');  
  $('<span class = "control_prev">Prev</span>').prependTo('#slidesShow');
  $('.control_next').css('display','none');
  $('.control_prev').css('display','none');
  var control = false;
   $('#slidesShow').mouseover(function(){
    if (!control){
      $('.control_next').css('display','');
      $('.control_prev').css('display','');
      control = true;
   }
   });
    $('#slidesShow').mouseout(function(){
      if (control){
        $('.control_next').css('display','none');
        $('.control_prev').css('display','none');
        control = false;
      }
    });

 $('.control_next').click(function(){
              
              $('#slidesContainer').animate({
                left: -elemWidth
               }, 500, function(){
                $('#slidesContainer>div:first-child').appendTo('#slidesContainer');
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer').css('left','0')
                });
             }); 
    $('.control_prev').click(function(){
                $('#slidesContainer').animate({
                left: +elemWidth   
               }, 500, function(){
                 $('#slidesContainer>div:last-child').prependTo('#slidesContainer');
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                  $('#slidesContainer').css('left','0')

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
        $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 options.index != 0
               ? options.index-1 : options.index = numberofElem-1;
                $('#slidesContainer>div:first-child').appendTo('#slidesContainer');
                $('#slidesContainer').css('left','0')
                   })
      }else{
        $('#slidesContainer').animate({
                left: +elemWidth
               }, 1000, function(){
                 options.index != numberofElem-1
               ? options.index+1 : options.index = 0;
                $('#slidesContainer>div:last-child').prependTo('#slidesContainer');
                $('#slidesContainer').css('left','0')
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
        $('#slidesContainer').animate({
                left: -elemWidth
               }, 1000, function(){
                 options.index != 1
               ? options.index-1 : optionsindex = numberofElem;
                 $('#slidesContainer>div:first-child').appendTo('#slidesContainer');  
                 $('#slidesContainer').css('left','0')
               })    
      } 
  }, options.autoplaySpeed);
      
    
    
 });   
};


}(jQuery))

$(document).ready(function(){
  $('#slidesShow').slider();
})

